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

const bluemixCredential = require('./cred_bluemix');
const RETRY_ATTEMPTS = process.env.RETRY_ATTEMPTS || 5;
const RETRY_TIMEOUT = process.env.RETRY_TIMEOUT || 1000;

const getCloudantCredentials = function(type) {
  let cloudantEnvName = '';
  let cloudantServiceName = '';

  switch (type) {
    case 'responses' :
      cloudantEnvName = 'CLOUDANT_URL';
      cloudantServiceName = `${process.env.APP_PREFIX}-cloudant-responses`;
      break;
  }

  let cloudantCred = {
    url: process.env[cloudantEnvName],
    plugin: 'retry',
    retryAttempts: RETRY_ATTEMPTS,
    retryTimeout: RETRY_TIMEOUT
  };

  const cloudantCredentials = bluemixCredential.getCredentials('cloudantNoSQLDB', cloudantServiceName);

  if (cloudantCredentials && cloudantCredentials.url) {
    cloudantCred = {
      url: cloudantCredentials.url,
      plugin: 'retry',
      retryAttempts: RETRY_ATTEMPTS,
      retryTimeout: RETRY_TIMEOUT
    };
  }

  return cloudantCred;
};

module.exports = {
  getCloudantCredentials
};
