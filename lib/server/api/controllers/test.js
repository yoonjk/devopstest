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
const logger = require('../../util/logger');
const configDao = require('../../data/config');

const getDocument = (req, res) => {
  let id = req.swagger.params.id.value;
  configDao.getDoc(id).then((body) => {
    res.json(body);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

const inputDocument = (req, res) => {
  let config = req.body;
  configDao.inputDoc(config).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

module.exports = {
  getDocument,
  inputDocument,
};
