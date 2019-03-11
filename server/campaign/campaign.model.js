const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Campaign Schema
 */
const CampaignSchema = new mongoose.Schema({
  campaignId: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  campaignStatus: {
    type: String,
    required: true,
  },
  campaignObjective: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Statics
 */
CampaignSchema.statics = {
  /**
   * Get сampaign
   * @param {ObjectId} id - The objectId of campaign.
   * @returns {Promise<Campaign, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((campaign) => {
        if (campaign) {
          return campaign;
        }
        const err = new APIError(
          'No such campaign exists!',
          httpStatus.NOT_FOUND,
        );
        return Promise.reject(err);
      });
  },

  /**
   * List campaigns in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of campaigns to be skipped.
   * @param {number} limit - Limit number of campaigns to be returned.
   * @returns {Promise<Campaign[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * Get All campaigns.
   * @returns {Promise<Campaign[]>}
   */
  findAll() {
    return this.find().exec();
  },

  /**
   * Remove campaign by id.
   * @returns {Promise<Campaign[]>}
   */
  removeOne(_id) {
    return this.remove({ _id }).exec();
  },
};

/**
 * @typedef Campaign
 */
module.exports = mongoose.model('Campaign', CampaignSchema);
