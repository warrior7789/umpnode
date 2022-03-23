'use strict';
const helper = require('../helper/helper');

module.exports = {
    sendError: function(res,error, errorMessages = [], code = 0) {
    	if(helper.isEmpty(errorMessages)){
    		errorMessages = null;
    	}
    	var data = {};
    	data.status = code;
    	data.message = error;
    	data.data = errorMessages;
    	data.success = false;
    	res.status(400).send(data);
    },
    sendResponse: function(res,result,message = "Success",code = 200,custom_response = [],token = '',extra_data = [],extra_key = []) {
    	
    	var data = {};
    	data.status = code;
    	data.message = message;
    	data.data = result;
    	data.success = true;

    	if(!helper.isEmpty(token)){
    		data.token = token;
    	}
    	if(helper.isEmpty(result)){
    		data.data = null;
    	}

    	res.status(200).send(data);
    },
};