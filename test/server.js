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

const should = require('should');
const request = require('supertest');
const sinon = require('sinon');
const {server} = require('../index');
let testId;
describe('Test', function() {
  // the wcs some times takes about 10+ seconds while calling from China :-(
  // TODO: add code to perform the converse result verfication instead of verify the output format
  this.timeout(10000);
  describe('REST APIS', function() {
    it('POST /test - Create test document', function(done) {
      testId = 'test' + Date();
      request(server)
        .post('/v1/api/test')
        .send({
          message: 'Do not try to see this document.'
        })
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          console.log(res.body);
          testId = res.body.id;
          done();
        });
    });

    it('GET /test - Get test document', function(done) {
      request(server)
        .get('/v1/api/test?id=' + testId)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          console.log(res.body);
          done();
        });
    });

  });
});
