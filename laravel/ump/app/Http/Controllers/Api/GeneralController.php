<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use App\User;
use App\Language;
use App\City;
use App\State;
use Validator;

use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use DB;
use App\Helpers\DataArrayHelper;
class GeneralController extends BaseController
{
	/**
	* Registration
	*/
	protected $response;
	
	public function getTowns(Request $request){
		//echo $request->province_id;
		$province = Town::select('name','id')->where('province_id',$request->province_id)->get();
		//dd($province);
		$this->response = $province;
		return $this->sendResponse($this->response,'success',1);
	}

	public function getLanguages(Request $request){
		$Language = Language::select('lang','id','native',)->get();
		$this->response = $Language;
		return $this->sendResponse($this->response,'success',1);
	}


	public function getCity(Request $request){
		
		$State = State::select('id')->where('country_id','=',101)->get()->toArray();
		if(!empty($request->search)){
			$City = City::select('cities.city', 'cities.city_id')
				->whereIn('state_id',$State)
				->where('cities.city','LIKE%',$request->search)
				->lang()->active()->sorted()->pluck('cities.city', 'cities.city_id')->toArray();
		}else{
			$City = City::select('cities.city', 'cities.city_id')->whereIn('state_id',$State)->lang()->active()->sorted()->pluck('cities.city', 'cities.city_id')->toArray();

		}
		$this->response = $City;
		return $this->sendResponse($this->response,'success',1);
	}
	
}
