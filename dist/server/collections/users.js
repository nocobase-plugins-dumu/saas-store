'use strict';

var database = require('@nocobase/database');
var constants = require('../../constants');

var users_default = database.extend({
  name: "users",
  fields: [constants.userExtendField()]
});

module.exports = users_default;
