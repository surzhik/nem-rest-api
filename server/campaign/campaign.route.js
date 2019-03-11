const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const campaignCtrl = require('./campaign.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/view')
  /** GET /api/view - Get list of campaigns */
  .get(campaignCtrl.list);

router
  .route('/view/:campaignId')
  /** GET /api/view/:campaignId - Get campaign */
  .get(campaignCtrl.get);

router
  .route('/create')
  /** POST /api/create - Create new campaign */
  .post(validate(paramValidation.createCampaign), campaignCtrl.create);

router
  .route('/delete')
  /** DELETE /api/delete - Delete all campaigns */
  .delete(campaignCtrl.remove);

/** Load campaign when API with campaignId route parameter is hit */
router.param('campaignId', campaignCtrl.load);

module.exports = router;
