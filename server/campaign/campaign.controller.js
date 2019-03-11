const config = require('../../config/config');
const adsSdk = require('facebook-nodejs-business-sdk');
const Campaign = require('./campaign.model');

const accessToken = config.fb.token;
adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const CampaignFB = adsSdk.Campaign;
const account = new AdAccount(`act_${config.fb.appId}`);

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {  // eslint-disable-line no-plusplus
    await callback(array[index], index, array);
  }
};

/**
 * Load Campaign and append to req.
 */
function load(req, res, next, id) {
  Campaign.get(id)
    .then((campaign) => {
      req.campaign = campaign; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get campaign
 * @returns {Campaign}
 */
function get(req, res) {
  return res.json(req.campaign);
}

/**
 * Create new campaign
 * @property {string} req.body.campaignId - The campaign Id from Facebook API.
 * @returns {Campaign}
 */
function create(req, res, next) {
  account
    .createCampaign([], {
      [CampaignFB.Fields.name]: req.body.campaignName,
      [CampaignFB.Fields.status]:
        CampaignFB.Status[req.body.campaignStatus.toLowerCase()],
      [CampaignFB.Fields.objective]:
        CampaignFB.Objective[req.body.campaignObjective.toLowerCase()],
    })
    .then((campaignFB) => {
      const campaign = new Campaign({
        campaignId: campaignFB._data.id,
        campaignName: req.body.campaignName,
        campaignStatus: req.body.campaignStatus.toLowerCase(),
        campaignObjective: req.body.campaignObjective.toLowerCase(),
      });
      campaign
        .save()
        .then(savedCampaign => res.json(savedCampaign))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * Get campaign list.
 * @property {number} req.query.skip - Number of campaigns to be skipped.
 * @property {number} req.query.limit - Limit number of campaigns to be returned.
 * @returns {Campaign[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Campaign.list({ limit, skip })
    .then(campaigns => res.json(campaigns))
    .catch(e => next(e));
}

/**
 * Delete campaign.
 * @returns {Campaigns List}
 */
async function deleteCompaign(compaignItem) {
  const gotCompaign = new CampaignFB(compaignItem.campaignId);
  await gotCompaign.delete();
  return await Campaign.removeOne(compaignItem._id);
}

async function remove(req, res, next) {
  const campaigns = await Campaign.findAll();

  await asyncForEach(campaigns, async compaignItem => deleteCompaign(compaignItem))
    .then(() => {
      res.json(campaigns);
    })
    .catch(e => next(e));
}

module.exports = { load, get, create, list, remove };
