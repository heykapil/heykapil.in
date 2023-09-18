const siteMetadata = {
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: "83be4a29-01a9-4435-9e68-2d09093afc56", // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
  },
};

module.exports = siteMetadata;
