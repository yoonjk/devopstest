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

const winston = require('winston');

var logger = new winston.Logger({
  level: process.env.LOGGER_LEVEL || 'info',
  rewriters: [
    (level, msg, meta) => {
      return meta;
    }
  ],
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true,
      colorize: true,
      label: process.env.APP_PREFIX || 'Data API server'
    })
  ]
});

module.exports = logger;
