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

require('dotenv').config();

const SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-tools/middleware/swagger-ui');
const app = require('express')();
const morgan = require('morgan');
const logger = require('./util/logger');

// Requireed for testing
module.exports = app;

var config = {
  appRoot: __dirname, // required config
  configDir: __dirname + '/config',
};

// REST logging
app.use(morgan('short', {
  stream: {
    write: str => { logger.info(str.slice(0, -1)); },
  },
}));
SwaggerExpress.create(config, (err, swaggerExpress) => {

  if (err) { throw err; }

  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(swaggerUi(swaggerExpress.runner.swagger));

  // Redirect to swagger page
  app.get('/', (req, res) => res.redirect('/docs'));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  logger.info(`Start server on port ${port}`);
  app.listen(port);
});
