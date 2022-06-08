<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use App\User;
use App\ProfileLanguage;
use Validator;
//use Illuminate\Validation\Rules\Password;
use Carbon\Carbon;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as VPassword;
use Illuminate\Support\Facades\Config;
use DB;
use Auth;
class UserController extends BaseController
{
	/**
	* Registration
	*/
	protected $response;

	

	public function setUserLanguages(Request $request){
		$user = Auth::user();
		$validator = Validator::make($request->all(), [
			'languages' 			=> 'required',
		]);
	    if ($validator->fails()) {
	       return $this->sendError($validator->errors()->first(), [],0);
	    }

	    if(!empty($request->languages)){
	    	$languages = explode(',',$request->languages);
	    	foreach ($languages as $key => $language) {
	    		$ProfileLanguage = ProfileLanguage::where('user_id',$user->id)->where('language_id',$language)->first();
	    		if(empty($ProfileLanguage)){
	    			$ProfileLanguage = new ProfileLanguage;
	    			$ProfileLanguage->user_id = $user->id;
	    			$ProfileLanguage->language_id = $language;
	    			$ProfileLanguage->save();
	    		}
	    	}
	    }
		//$ProfileLanguage = ProfileLanguage::where()
		return $this->sendResponse($this->response,__('api.language_save_successfully'),1);
	}


	

	
}
