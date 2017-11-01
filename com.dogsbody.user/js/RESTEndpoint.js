define (function(){
    'use strict';
    
    const RESTEndpointURL = "https://dogsbody-gse00000429.apaas.em2.oraclecloud.com";
    
    let RESTEndpoint = function(){
    };
    
    RESTEndpoint.getURL = function(){
        return RESTEndpointURL;
    };
    
    return RESTEndpoint;
});
