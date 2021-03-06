import pubwiseAnalytics from 'src/adapters/analytics/pubwiseanalytics';
let events = require('../../../../src/events');
let adaptermanager = require('../../../../src/adaptermanager');
let constants = require('../../../../src/constants.json');

describe('PubWise Prebid Analytics', function () {
  describe('enableAnalytics', function () {
    it('should catch all events', function () {
      sinon.spy(pubwiseAnalytics, 'track');

      adaptermanager.registerAnalyticsAdapter({
        code: 'pubwiseanalytics',
        adapter: pubwiseAnalytics
      });

      adaptermanager.enableAnalytics({
        provider: 'pubwiseanalytics',
        options: {
          site: ['test-test-test-test']
        }
      });

      events.emit(constants.EVENTS.AUCTION_INIT, {});
      events.emit(constants.EVENTS.BID_REQUESTED, {});
      events.emit(constants.EVENTS.BID_RESPONSE, {});
      events.emit(constants.EVENTS.BID_WON, {});

      events.emit(constants.EVENTS.AUCTION_END, {});
      events.emit(constants.EVENTS.BID_TIMEOUT, {});

      /* testing for 6 calls, including the 2 we're not currently tracking */
      sinon.assert.callCount(pubwiseAnalytics.track, 6);
    });
  });
});
