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

const getCredentials = function(serviceType, serviceName) {
  if (process.env.VCAP_SERVICES) {
    const services = JSON.parse(process.env.VCAP_SERVICES);
    if (services && services[serviceType]) {
      const service = services[serviceType];
      for (let i = 0; i < service.length; i++) {
        const instances = service[i];
        if (!serviceName || serviceName === instances.name) {
          return instances.credentials;
        }
      }
    }
  }
  return {};
};

module.exports = {
  getCredentials
};
