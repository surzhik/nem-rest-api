const Joi = require('joi');

module.exports = {
  // POST /api/users
  createCampaign: {
    body: {
      campaignName: Joi.string().required(),
      campaignStatus: Joi.string()
        .uppercase()
        .valid('ACTIVE', 'PAUSED')
        .required(),
      campaignObjective: Joi.string()
        .uppercase()
        .valid('APP_INSTALLS', 'BRAND_AWARENESS', 'CONVERSIONS', 'EVENT_RESPONSES', 'LEAD_GENERATION', 'LINK_CLICKS', 'LOCAL_AWARENESS', 'MESSAGES',
          'OFFER_CLAIMS', 'PAGE_LIKES', 'POST_ENGAGEMENT', 'PRODUCT_CATALOG_SALES', 'REACH', 'VIDEO_VIEWS')
        .required(),
    },
  },
};
