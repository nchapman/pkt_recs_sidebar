require('../styles/app.scss');
const config = require('../../app.config.js');
const PageRecsView = require('./views/page_recs_view');
const RECS_COUNT = 5;

let sidebarWindowId;
let currentSidebarUrl;
let recommendations = new Backbone.Collection();
let view = new PageRecsView({ collection: recommendations });

// Setup recs view
$('#page-recs').html(view.render().el);

// Setup the current window
browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
  sidebarWindowId = windowInfo.id;
  fetchRecommendations();
});

// Update content when a new tab becomes active.
browser.tabs.onActivated.addListener(fetchRecommendations);

// Update content when a new page is loaded into a tab.
browser.tabs.onUpdated.addListener(fetchRecommendations);

function fetchRecommendations() {
  browser.tabs.query({windowId: sidebarWindowId, active: true})
    .then((tabs) => {
      let url = tabs[0].url;

      // TODO: debounce this in some other way
      if (currentSidebarUrl !== url) {
        currentSidebarUrl = url;

        return fetch(`https://getpocket.com/v3/firefox/item-recs?consumer_key=${config.pocket_consumer_key}&count=${RECS_COUNT}&url=${encodeURIComponent(url)}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            recommendations.reset(json.list);
          });
      }
    });
}
