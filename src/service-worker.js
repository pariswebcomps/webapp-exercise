/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/google-apis/bower.json","688a34e0c0d6756db9e268d04b21926b"],["bower_components/google-apis/demo/index.html","b9a5852cb72a556b5194aa75850931fb"],["bower_components/google-apis/google-apis.html","d3e983a7edc8c9c24a6d63a21733448b"],["bower_components/google-apis/google-client-loader.html","2b76020735bc2c9a7ba4a4134ac62ad7"],["bower_components/google-apis/google-js-api.html","cc241aa446011e92b532bed35663b730"],["bower_components/google-apis/google-legacy-loader.html","362fd9b910952b01afdfacc50b44f116"],["bower_components/google-apis/google-maps-api.html","a4f26e7c6fdfb09bd775cccce9c91b53"],["bower_components/google-apis/google-plusone-api.html","d66557cbef3cf9d95717ed7b13e64551"],["bower_components/google-apis/google-realtime-api.html","ddb8dfb0a46a7eab3035e76641b9d5fd"],["bower_components/google-apis/google-youtube-api.html","775fd7de0683dd1a1a2a207d1f66a355"],["bower_components/google-apis/index.html","6bd57244872d1ce3cc9c112ae058204b"],["bower_components/google-map/bower.json","5844d38ca7d6cf22a28d2399b3740d8b"],["bower_components/google-map/demo/index.html","ae0841ab12479c9ea4106444f3542c17"],["bower_components/google-map/demo/kml.html","616cdd18bb930d9acea40496049e5bb0"],["bower_components/google-map/demo/polys.html","defaf755a83aee852a8e79f7323bc6c9"],["bower_components/google-map/google-map-directions.html","e94788ac87dcd26c103dcd409c60cb72"],["bower_components/google-map/google-map-elements.html","05dc07afd3bf075d38dc185196d5e76b"],["bower_components/google-map/google-map-marker.html","48bcaeee081320befea5cf3ac063d096"],["bower_components/google-map/google-map-point.html","7850315ef8d6cf28734124b68d3a7635"],["bower_components/google-map/google-map-poly.html","92858c4c74f51700792c945c95301af6"],["bower_components/google-map/google-map-search.html","c774a3792411a77c84aefbe86e950b7f"],["bower_components/google-map/google-map.html","a33df7446a5e18b77feffddab7430f2c"],["bower_components/google-map/index.html","f61c596dc87506c4a402a80c279a6ed4"],["bower_components/google-map/metadata.html","c4afe9ee0918eb95b0f039b6b2ee4305"],["bower_components/iron-jsonp-library/bower.json","62a1c74c659f58a89b72032b5b5738fe"],["bower_components/iron-jsonp-library/demo/index.html","83690f9826709b031e2dd1490d6520c8"],["bower_components/iron-jsonp-library/hero.svg","f9b09ff8259eda7519959bf0c0c9348d"],["bower_components/iron-jsonp-library/index.html","05d0abe0ed8dad3699359b4102400b21"],["bower_components/iron-jsonp-library/iron-jsonp-library.html","8ea31c5dcab113a67ed1d90b8a2a0eb9"],["bower_components/iron-resizable-behavior/bower.json","1c87fa4a904987e0d536fb60bc3a6eb5"],["bower_components/iron-resizable-behavior/demo/index.html","e0f7cf728aa97c39d4834e693c4630a9"],["bower_components/iron-resizable-behavior/demo/src/x-app.html","2aa6ca57b0de231aed543a927d3f61ad"],["bower_components/iron-resizable-behavior/index.html","97869841e903c8dc4022a56bc4c9e777"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","25120519f04d669b70a0b04c2615d0b9"],["bower_components/iron-resizable-behavior/test/basic.html","06b7a0e400127f521f73a894ed51b0af"],["bower_components/iron-resizable-behavior/test/index.html","72ef9cbc3e30318e92fd0d176f6a9613"],["bower_components/iron-resizable-behavior/test/iron-resizable-behavior.html","d14fc2f9406e915742b66b75b6d94caf"],["bower_components/iron-resizable-behavior/test/test-elements.html","357311aa15795dcd645f9bbee076fab7"],["bower_components/iron-selector/bower.json","591f56e6b35126308315f36e0eaf1f6d"],["bower_components/iron-selector/demo/index.html","d64a8f225afc4d0f3f0c417e1328d829"],["bower_components/iron-selector/index.html","52ec8b51fac1f8bfb881c1164509ce20"],["bower_components/iron-selector/iron-multi-selectable.html","e6100fe240603126deea4518f606821f"],["bower_components/iron-selector/iron-selectable.html","c0be605c5a2fa78c436304dff82f3428"],["bower_components/iron-selector/iron-selection.html","cc0797080a508370c26a7104a29433ca"],["bower_components/iron-selector/iron-selector.html","c8946dcd397168b6ba3248f4ce7d0ca9"],["bower_components/iron-selector/test/activate-event.html","40f76613815d40df27071be2533383cc"],["bower_components/iron-selector/test/attr-for-selected-elements.html","df5aa2370567847b2bb08b9b8b401605"],["bower_components/iron-selector/test/attr-for-selected.html","f8776335a60ccbf46daa9a8d8b252145"],["bower_components/iron-selector/test/basic.html","0b5352d58191903bed3bca575b314216"],["bower_components/iron-selector/test/content-element.html","226421db182193efdcb681e0d05b8847"],["bower_components/iron-selector/test/content.html","43a127865395cf96b0e2be594497c376"],["bower_components/iron-selector/test/excluded-local-names.html","0199f288cf1c5a29e06c48375ac256df"],["bower_components/iron-selector/test/index.html","53e10ab942a5c13afe2f35bd3183fe04"],["bower_components/iron-selector/test/multi.html","e7424d8a38d14acf2cebf1233d598ed6"],["bower_components/iron-selector/test/next-previous.html","3256699bdc035b2a9b79e68c0fb624d0"],["bower_components/iron-selector/test/numeric-ids.html","0bf21c6cafe288c9097925b8ade41426"],["bower_components/iron-selector/test/selected-attribute.html","73c11ae2e1dc7794db0e79fd8c6df64f"],["bower_components/iron-selector/test/template-repeat.html","dde863145aae073d453a37fdcf25033d"],["bower_components/polymer/bower.json","6e19330a8895f8cd989bd61f11b6b2b1"],["bower_components/polymer/polymer-micro.html","c0a6a1aea2d2b8c30431d6f8f02726e8"],["bower_components/polymer/polymer-mini.html","b80b33997503559334cf2c5702f4e8b0"],["bower_components/polymer/polymer.html","e64791b71ed76d6dd1977868460e86cc"],["bower_components/webcomponentsjs/CustomElements.js","307b37f7a1788c31697b59c1188385d9"],["bower_components/webcomponentsjs/CustomElements.min.js","10480cbc19e5c4ef0127c6e7aa0d96b0"],["bower_components/webcomponentsjs/HTMLImports.js","024b667f081fbd609e9217ebf38857f3"],["bower_components/webcomponentsjs/HTMLImports.min.js","65d8cf6494d79d87ec71e3450941b294"],["bower_components/webcomponentsjs/MutationObserver.js","fb270c356ee7a93d3b24b5ee4ef63fab"],["bower_components/webcomponentsjs/MutationObserver.min.js","5ad9184185a02abde843125cd99a3563"],["bower_components/webcomponentsjs/ShadowDOM.js","6cd6b56e29caa266c3005c8a674b6570"],["bower_components/webcomponentsjs/ShadowDOM.min.js","846cca6d315bedd14510ed41612a7d06"],["bower_components/webcomponentsjs/bower.json","4b6f7c4b92bb4053321a16b962ded176"],["bower_components/webcomponentsjs/package.json","7ecb30e1ab4ba52753e35c1f01defb94"],["bower_components/webcomponentsjs/webcomponents-lite.js","9bd9e8a827ca7ed9ce61425f1a7403f8"],["bower_components/webcomponentsjs/webcomponents-lite.min.js","b0f32ad3c7749c40d486603f31c9d8b1"],["bower_components/webcomponentsjs/webcomponents.js","374a564027fecf40044696642330db85"],["bower_components/webcomponentsjs/webcomponents.min.js","fd5d02f9e1e7855ab9ddb4dd8047702d"],["dist/index.html","fec95c466ec2e3814dd7764b1b64b128"],["dist/inline.js","abcd9d2c49e676f37d988a4d0768fe5e"],["dist/main.088b2417c7fff60e1690.bundle.js","5551f04651545df0522615de10dbc392"],["dist/main.088b2417c7fff60e1690.bundle.js.gz","3fe1bd113dd160f95b5fc3b6657d7ff5"],["dist/styles.60f7a167ea466b148312.bundle.js","7d815bed5157acfde478145f92a7be7a"],["images/bg.png","177becf190f681c48c246fbb61c99ac7"],["images/icons/icon-128x128.png","f6ce15dd1b39fe25edeb08ac74a84960"],["images/icons/icon-144x144.png","55d31cb5fdb270d022642692859513ec"],["images/icons/icon-152x152.png","aeeb202408fd0c3348ab5f43faae51ed"],["images/icons/icon-192x192.png","bdc8f1754479f69d1c6344a4dc2535fe"],["images/icons/icon-256x256.png","d06071609f518dc73ccb47ce754428ba"],["images/icons/icon-32x32.png","cf9cec7156ef42d71747c4f91f6fde01"],["images/md-cellphone.svg","41458fe946ffcc524df6f4258706f397"],["images/md-delete.svg","0d5737730dfb64e0326e9176368f8f44"],["images/md-edit.svg","4a89b9af0c451840e72de8877e9308ca"],["images/md-email.svg","c40fc05b32b6d6c7e13e90c6e91010c2"],["images/md-github.svg","d150d4d60b034a7b8fc0df36dd389590"],["images/md-home.svg","c9eae4986d85f4d2c857f36bf8224c76"],["images/md-install.svg","4b5c054e76b0df3cbbc851854cd10c3c"],["images/md-linkedin.svg","8fcac3b248cff064c0d887b34489cd24"],["images/md-list.svg","03a27d1e2adcc26cc7d0c6d1959f366d"],["images/md-map.svg","2c719df89c896acf20af2daadd95ca89"],["images/md-phone.svg","c73d19af214c9f8e15d14e719d2416e4"],["images/md-slack.svg","700e4edf9ed8c827227a0dab0fcf7d3c"],["images/md-subscribe.svg","ae0736584bf271c49540476c9d74df6b"],["images/md-twitter.svg","f8203f6a05d7d471731eda5a10eff99c"],["images/md-unsubscribe.svg","b14658955d8f4bbb0d2a9aa3fff846e0"],["images/touch/apple-touch-icon.png","6f03e9c4471d2efc0d622089274153cf"],["images/touch/chrome-splashscreen-icon-384x384.png","2efe194a975f4c640c5f219c4e727439"],["images/touch/chrome-touch-icon-192x192.png","6a0551f0c9b53ca62f3c67a5eaf51846"],["images/touch/icon-128x128.png","ad7a8966882b6f974b2b5bf31dac1cb3"],["images/touch/ms-icon-144x144.png","f348014550511fc297d34e1ffc6e7ae5"],["images/touch/ms-touch-icon-144x144-precomposed.png","f348014550511fc297d34e1ffc6e7ae5"],["manifest.webapp","7195360a4f80ff6ad51175e113ca9a79"],["service-worker.js","42098eb48daa6ede9b21d78d4b88ab80"]];
var cacheName = 'sw-precache-v2-static-v1-' + (self.registration ? self.registration.scope : '');




var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});




