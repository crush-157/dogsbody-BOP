define([
  'bop/js/api/operation/BOPAuthenticators',
  'bop/js/api/operation/OperationBuilder',
  'bop/js/api/resource/Resource',
  'operation/js/api/Operation',
  'bop/js/api/operation/OperationInput',
  'com.dogsbody.user/js/RESTEndpoint'
], function(
  BOPAuthenticators,
  OperationBuilder,
  Resource,
  Operation,
  OperationInput,
  RESTEndpoint
) {

  'use strict';

  var RESTOperationProvider = function(dependencies) {

    var self = this;
    this._operations = [];
    this._resources = [];
    this._baseUri = RESTEndpoint.getURL();
    this._userUri = self._baseUri + '/users';

    // Check to see if entity is registered, and if so provide a simple
    // read operation for a list of entities

    var userEntity = Abcs.Entities().findById(RESTOperationProvider.USER_ENTITY_ID);
    if (userEntity) {

      //DELETE USER
      this._operations.push(new OperationBuilder({
          name: 'DELETE existing user',
          type: Operation.Type.DELETE,
          performs: function(operationData) {
            var opData = operationData.getData();
            this._pdata = {
              "id": opData.id
            };
            var jsonData = JSON.stringify(this._pdata);
            return self.getAuthenticator().invoke({
              url: self._userUri + '/' + opData.id,
              method: 'DELETE',
              contentType: "application/json; charset=utf-8",
              data: jsonData,
              dataType: 'json'
            });
          }
        }).description('delete a specific user')
        .takes(new OperationInput({
          entity: userEntity
        }))
        .build());

      //GET ALL USERS
      this._operations.push(new OperationBuilder({
          name: 'Fetch all users',
          type: Operation.Type.READ_MANY,
          performs: function(operationData) {
            return self.getAuthenticator().invoke({
              url: self._userUri,
              method: 'GET',
              dataType: 'json'
            });
          }
        }).description('Fetch all users')
        .returns(userEntity)
        .build());

      // Generate the resource model required to configure the security model
      //
      var all_users = Resource.create({
        id: 'user_collection',
        template: self._userUri,
        entity: RESTOperationProvider.USER_ENTITY_ID
      });

      var one_user = Resource.createChild(all_users, {
        id: 'user_instance',
        template: '{id}'
      });

      this._resources.push(all_users);
      this._resources.push(one_user);


      //CREATE USER
      this._operations.push(new OperationBuilder({
        name: 'POST for new User',
        type: Operation.Type.CREATE,
        performs: function(operationData) {
          var opData = operationData.getData();
          this._pdata = {
            "first_name": opData.first_name,
            "last_name": opData.last_name,
            "email_address": opData.email_address
          };
          var jsonData = JSON.stringify(this._pdata);
          return self.getAuthenticator().invoke({
            url: self._userUri,
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            dataType: 'json'
          });
        }
      }).description('POST User data to Dogsbody').takes(new OperationInput({
        entity: userEntity
      })).build());

      //

      //UPDATE USER
      this._operations.push(new OperationBuilder({
        name: 'PUT for existing User',
        type: Operation.Type.UPDATE,
        performs: function(operationData) {
          var opData = operationData.getData();
          this._pdata = {
            "first_name": opData.first_name,
            "last_name": opData.last_name,
            "email_address": opData.email_address
          };
          var jsonData = JSON.stringify(this._pdata);
          return self.getAuthenticator().invoke({
            url: self._userUri + '/' + opData.id,
            method: 'PUT',
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            dataType: 'json'
          });
        }
      }).description('PUT User data to Dogsbody').takes(new OperationInput({
        entity: userEntity
      })).build());

      //

    }

    //Create an instance of authenticator
    this._authenticator = BOPAuthenticators.getDefault(dependencies, {
      getResources: function() {
        return self._resources;
      }
    });

  };

  RESTOperationProvider.USER_ENTITY_ID = 'com.dogsbody.user.user';

  RESTOperationProvider.prototype.getOperations = function() {
    return this._operations;
  };

  RESTOperationProvider.prototype.getAuthenticator = function() {
    return this._authenticator;
  };

  return RESTOperationProvider;
});
