<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use App\User;
use Validator;
//use Illuminate\Validation\Rules\Password;
use Carbon\Carbon;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as VPassword;
use Illuminate\Support\Facades\Config;
use DB;
class AuthController extends BaseController
{
	/**
	* Registration
	*/
	protected $response;

	public function register(Request $request){
		$validator = Validator::make($request->all(), [
			'name' 			=> 'required|min:1',
			'email' 		=> 'required|email|regex:/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix|unique:users,email',
			'phone'     	=> 'required|unique:users',
			'birthdate' 	=> 'required|date',
			'province_id' 	=> 'required|integer',
			'town_id' 		=> 'required|integer',
			'password' 		=> 'required',			
			'avatar'    	=> 'required|image|mimes:jpeg,png,jpg,gif,svg',
			'refcode'		=> 'required|exists:users,refcode',
		]);
	    if ($validator->fails()) {
	       return $this->sendError($validator->errors()->first(), [],0);
	    }
	    
	    $this->response = getUserDetails($user);	   
	    return $this->sendResponse($this->response,__('api.register_successfully'),1,'',$token);
	}
     
	/**
	* Login
	*/

	public function sendOtp(Request $request){
		$validator = Validator::make($request->all(), [
			'mobile' 			=> 'required',
		]);
	    if ($validator->fails()) {
	       return $this->sendError($validator->errors()->first(), [],0);
	    }

	    $user = User::where('mobile_num',$request->mobile)->first();

	    if(!empty($user)){
	    	$user->otp = 1111;
	    	$user->save();
	    }else{
	    	$user = new User;
	    	$user->mobile_num = $request->mobile;
	    	$user->otp = 1111;
	    	$user->save();
	    }
	    return $this->sendResponse($this->response,__('api.otp_send_successfully'),1);

	}
	public function loginWithOtp(Request $request){
		$validator = Validator::make($request->all(), [
			'mobile' 			=> 'required',
			'otp' 			=> 'required',
		]);
	    if ($validator->fails()) {
	       return $this->sendError($validator->errors()->first(), [],0);
	    }

	    $user = User::where('mobile_num',$request->mobile)->where('otp',$request->otp)->first();
	    if(!empty($user)){
	        $message = __('api.login_successfully');	        
	        $token = $user->createToken('gamerPro')->accessToken;        
	    	$this->response = $user;
	    	$user->otp=null;
	    	$user->save();
	    	return $this->sendResponse($this->response,$message,1,'',$token);
	    }else{
	    	return $this->sendError(__('api.invalid OTP'),[],0);
	    }
		
	}

	
	public function getProvinces(Request $request){
		$province = Province::select('name','id')->get();
		$this->response = $province;
		return $this->sendResponse($this->response,'success',1);

	}

	public function getBanks(Request $request){
		$banks = DB::table('banks')->select('name')->get();
		$this->response = $banks;
		return $this->sendResponse($this->response,'success',1);
	}

	public function getTowns(Request $request){
		//echo $request->province_id;
		$province = Town::select('name','id')->where('province_id',$request->province_id)->get();
		//dd($province);
		$this->response = $province;
		return $this->sendResponse($this->response,'success',1);
	}


	public function checkReferal(Request $request){
		$parent = User::select(['id','name','isverify','created_at'])->where('status',1)->where('is_block',0)->where('refcode',$request->refcode)->first();		
		if(!empty($parent)){
			$user_m_withdraw = Pincode::select(['id'])->where('user_id',$parent->id)->where('is_withdraw',1)->first();
			if(!empty($user_m_withdraw)){				
			    return $this->sendError( $parent->name. __('api.withdraw_mature_error_no_invitation'), [],0);           
			}
			$USER_MIN_PIN_SLOTS = config('site_setting.USER_MIN_PIN_SLOTS');
			$parent_eligible = 1;
			$REWARD_ELEGIBLE_DOCUMNET = config('site_setting.REWARD_ELEGIBLE_DOCUMNET');
			if($REWARD_ELEGIBLE_DOCUMNET ==1){
			    if($parent->isverify !=1)
			        $parent_eligible =0;
			}
			$month = config('site_setting.REWARD_ELEGIBLE_DATE');
			$REWARD_ELEGIBLE_DATE = date('Y-m-d', strtotime(date("Y-m-d") . "-$month months") );
			//dd($REWARD_ELEGIBLE_DATE);
			$user_reg_date = date("Y-m-d",strtotime($parent->created_at));
			if($user_reg_date <= $REWARD_ELEGIBLE_DATE){
			    //echo "<br>yes eligigeble";
			}else{
			    //echo "<br>not eligigeble";
			    $parent_eligible =0;
			}
			$total_pincodes = Pincode::select(['id'])->where('user_id',$parent->id)->where('is_withdraw',0)->where('type','!=','reward')->count();
			if($USER_MIN_PIN_SLOTS > $total_pincodes){
			    $parent_eligible =0;

			}			
			if( strtotime($parent->created_at) < strtotime("2022-01-01 00:00:00") ){
				$parent_eligible =1;				
			}
			/*if( (isset($_SERVER["HTTP_HOST"])) && ($_SERVER["HTTP_HOST"] == "ump.staging-server.in" )) {
			    $parent_eligible =1;
			}*/
			if($parent_eligible == 0){
				$message = $parent->name . " is not yet eligible for Referral Rewards. You may use other member's id.";
				return $this->sendError($message,[],0);
			}
			$this->response['referral_id'] = $parent->id;
			return $this->sendResponse($this->response,'successfully.',1);
		}else{
			return $this->sendError(__('api.referral_not_found'),[],0);
		}
	}


	public function ForgotPassword(Request $request){		
		$validator = Validator::make($request->all(), [
			'email' => 'required|email|exists:users,email',
		]);

		if ($validator->fails()) {
		   return $this->sendError($validator->errors()->first(), [],0);
		}

		$Past24Hour = Carbon::now()->subHour(24);
		$ForgotPassword = ForgotPassword::where('email',$request->email)->first();
		if(!empty($ForgotPassword)){
			////if($ForgotPassword->requested_at < )
			if(strtotime($Past24Hour) < strtotime($ForgotPassword->requested_at)){
				if($ForgotPassword->count >= 3){
					return $this->sendError(__('api.forgot_passwords_per_day_reach_max_limit'), [],0);
				}
				$ForgotPassword->count = $ForgotPassword->count + 1;
			}else{
				$ForgotPassword->count =1;
				$ForgotPassword->requested_at = Carbon::now();
			}
			$ForgotPassword->ip = $request->ip();
			$ForgotPassword->save();
		}else{
			$ForgotPassword = new ForgotPassword;
			$ForgotPassword->email = $request->email;
			$ForgotPassword->count = 1;
			$ForgotPassword->requested_at = Carbon::now();
			$ForgotPassword->ip = $_SERVER['REMOTE_ADDR'];
			$ForgotPassword->save();
			//dd($ForgotPassword);
		}		
		
		//return $this->sendResponse([],'please check your email to reset password.',1);
		try {
			$settings = SiteSetting::all()->pluck('value','key')->toArray();
			$config = array(
			    'transport' => $settings['MAIL_MAILER'],
			    'host' => $settings['MAIL_HOST'],
			    'port' => $settings['MAIL_PORT'],
			    'encryption' => $settings['MAIL_ENCRYPTION'],
			    'username' => $settings['MAIL_USERNAME'],
			    'password' => $settings['MAIL_PASSWORD'],
			    'timeout' => null,
			    'auth_mode' => null,
			);
			Config::set('mail.mailers.smtp', $config); 
			Config::set('mail.from.address', $settings['MAIL_FROM_ADDRESS']);       
        	Config::set('mail.from.name', $settings['MAIL_FROM_NAME']);
			
			$status = Password::sendResetLink(
		        $request->only('email')
		    );
		}catch (\Exception $e) {
		   //return $this->sendError($e->getMessage(), [],0); 
		   return $this->sendError(__('api.server_send_emil_error'), [],0);		   
		}
	    if($status === Password::RESET_LINK_SENT){
	    	return $this->sendResponse([],__('api.email_password_reset'),1);
	    }else{
	    	return $this->sendError($status,'',0);
	    }	    
	}


	public function logout(Request $request){
	    $request->user()->token()->revoke();
	    return $this->sendResponse($this->response,__('api.loged_out_message'),1);	    
	}

	public function testing(Request $request){
			abort(404);
			

			// instant reward 
			//$Rewards = Reward::all();
			$Rewards = Reward::get();
			echo "<pre>";print_r($Rewards);echo"</pre>";
			if($Rewards->isEmpty()){
			    echo "empty\n";
			}else{
			    foreach ($Rewards as $key => $Reward) {
			        $user = User::find($Reward->user_id);
			        $pindcode_data = array();
			        $pindcode_data['pincode']=Pincode::generateUniqueCode('UMP');
			        $pindcode_data['user_id']=$Reward->user_id;
			        $pindcode_data['type']='reward';
			        $pindcode_data['is_slot'] =1;
			        $pindcode_data['slot_converted_Date'] = todayDateTime();
			        $pindcode_data['received_on'] = todayDateTime();
			        $pindcode_data['slot_origin'] = $Reward->slot_origin;
			        $pindcode_data['pin_amount']=config('site_setting.PINCODE_PRICE',5000);
			        $reward_slot = Pincode::create($pindcode_data);

			        $PincodeHistory = PincodeHistory::create([
			            'pincode_id'    => $reward_slot->id,
			            'user_id'       => $Reward->user_id,
			            'action'        => 'slot_reward',
			            'message'       => $user->name ." get slot as ".$Reward->slot_origin." Reward "
			        ]);
			        $Reward->delete();

			        if(!empty($users[$user->id])){
			            $users[$user->id]['count_reward'] = $users[$user->id]['count_reward'] + 1;
			        }else{
			            $users[$user->id]['count_reward'] = 1;
			            $users[$user->id]['user'] = $user;
			        }

			    }
			    
			    if(!empty($users)){
			        foreach ($users as $key => $user) {
			            $title = "Reward Received";
			            $message= "You have received ".$user['count_reward']." rewards for the week.";
			            mobileNotification($user['user'],$title,$message);
			        }
			    }
			}

			dd("reward given");







			$Beneficiary = Beneficiary::where('user_id',$request->user_id)->first();
			if(!empty($Beneficiary)){
				$Beneficiary->delete();
				dd("deleted");
			}

			dd("safsad");
			$users_id = User::where('user_type','user')->whereNull('week_withdraw')->orderBy('id','ASC')->get()->pluck('id')->toArray();
			//dd($users_id);
			if(!empty($users_id)){
				$total_users_in_bunch = (int) (count($users_id)/4) + 1;
				$array_split = array_chunk($users_id,$total_users_in_bunch);
				
				$users_week1 = implode(',',$array_split[0]);
				$users_week2 = implode(',',$array_split[1]);
				$users_week3 = implode(',',$array_split[2]);
				$users_week4 = implode(',',$array_split[3]);

				$update_1 = "UPDATE users set week_withdraw='week1' where id IN(".$users_week1.")";
				$db = DB::select($update_1);

				$update_2 = "UPDATE users set week_withdraw='week1' where id IN(".$users_week2.")";
				$db = DB::select($update_2);

				$update_3 = "UPDATE users set week_withdraw='week1' where id IN(".$users_week3.")";
				$db = DB::select($update_3);

				$update_4 = "UPDATE users set week_withdraw='week1' where id IN(".$users_week4.")";
				$db = DB::select($update_4);

				dd("completed");
			}else{
				dd("noting to do");
			}



	}
}
