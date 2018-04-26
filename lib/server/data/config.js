/**
*  IBM Confidential
*
*  OCO Source Materials
*
*  5799-MA4
*
*  © Copyright IBM Corp. 2017
*
*  The source code for this program is not published or otherwise divested of its trade secrets,
*  irrespective of what has been deposited with the U.S. Copyright Office.
*/

'use strict';
const extend = require('util')._extend;
const Cloudant = require('cloudant');
const BluebirdPromise = require('bluebird');
const logger = require('../util/logger');
const cloudantCredential = require('../util/cred_cloudant').getCloudantCredentials('responses');

const CONFIG_DB_NAME = 'test';

const cloudant = Cloudant(cloudantCredential);
const _db = BluebirdPromise.promisifyAll(cloudant.use(CONFIG_DB_NAME));

const getDoc = (id) => {
  return _db.getAsync(id);
};

const inputDoc = (input) => {
  return _db.insertAsync(input);
};

module.exports = {
  getDoc,
  inputDoc,
};
