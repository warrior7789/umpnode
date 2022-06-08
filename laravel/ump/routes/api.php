<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::group([
    'namespace'=>'Api',
], function () {

     Route::get('get-languages', 'GeneralController@getLanguages');
     Route::get('get-city', 'GeneralController@getCity');

    Route::group([
        'prefix' => 'users',
    ], function () {
        Route::post('send-otp', 'AuthController@sendOtp');
        Route::post('login-with-otp', 'AuthController@loginWithOtp');
        
        Route::get('getState', 'GeneralController@getState');
        Route::post('register', 'AuthController@register');
        
        Route::group([
          'middleware' => ['auth:api'],
        ], function() {
            Route::post('set-language', 'UserController@setUserLanguages');
        });
    });

});