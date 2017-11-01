define([
  'bop/js/api/entity/DataModelFactory',
  'entity/js/api/PropertyType'
], function(
  DataModelFactory,
  PropertyType
) {

  'use strict';

  var RESTEntityProvider = function() {};

  RESTEntityProvider.USER_ENTITY_ID = 'com.dogsbody.user.user';

  RESTEntityProvider.prototype.getEntities = function() {

    var self = this;

    // Lazily create entities, this model is not used for RT or most DT.
    // Do the entity creation as late as possible.

    if (!self._entities) {
      self._entities = [];
      self._entities.push(DataModelFactory.createEntity({
        id: RESTEntityProvider.USER_ENTITY_ID,
        singularName: 'User',
        pluralName: 'Users',
        description: 'A list of Users',
        properties: [
          DataModelFactory.createProperty({
            id: 'id',
            name: 'ID',
            type: PropertyType.KEY
          }), DataModelFactory.createProperty({
            id: 'first_name',
            name: 'First Name',
            type: PropertyType.TEXT
          }), DataModelFactory.createProperty({
            id: 'last_name',
            name: 'Last Name',
            type: PropertyType.TEXT
          }), DataModelFactory.createProperty({
            id: 'email_address',
            name: 'Email Address',
            type: PropertyType.EMAIL
          })
        ]
      }));
    }

    return self._entities;
  };

  return RESTEntityProvider;
});
