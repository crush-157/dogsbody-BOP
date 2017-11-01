define([
  'bop.dt/js/api/SimpleBOPExtensionManager'
], function(
  SimpleBOPExtensionManager
) {

  'use strict';

  var RESTBOP = function() {};

  RESTBOP.prototype.getEntityProviderPath = function() {
    return 'com.dogsbody.user/js/RESTEntityProvider';
  };

  RESTBOP.prototype.getOperationProviderPath = function() {
    return 'com.dogsbody.user/js/RESTOperationProvider';
  };

  var em = new SimpleBOPExtensionManager(new RESTBOP());

  return em;
});
