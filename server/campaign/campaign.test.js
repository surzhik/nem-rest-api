const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  const campaign = {
    campaignName: 'Hello world 2',
    campaignStatus: 'paused',
    campaignObjective: 'page_likes',
  };

  describe('# POST /api/create', () => {
    it('should create a new campaign', (done) => {
      request(app)
        .post('/api/create')
        .send(campaign)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.campaignName).to.equal(campaign.campaignName);
          expect(res.body.campaignStatus).to.equal(campaign.campaignStatus);
          expect(res.body.campaignObjective).to.equal(
            campaign.campaignObjective,
          );
          done();
        })
        .catch(done);
    });

    it('should return error on wrong parameter', (done) => {
      campaign.campaignObjective = 'LoremIpsum';

      request(app)
        .post('/api/create')
        .send(campaign)
        .expect(httpStatus.BAD_REQUEST)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/delete/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete('/api/delete')
        .expect(httpStatus.OK)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
