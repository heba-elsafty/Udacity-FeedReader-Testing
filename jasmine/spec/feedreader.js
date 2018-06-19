/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each contain a url that is defined and is not empty', function() {
          for (const item in allFeeds) {
            let feedUrl = allFeeds[item].url;

            expect(feedUrl).toBeDefined();
            expect(feedUrl).not.toEqual('');
          }
        })

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each contain a name that is defined and is not empty', function() {
          for (const item in allFeeds) {
            let feedName = allFeeds[item].name;

            expect(feedName).toBeDefined();
            expect(feedName).not.toEqual('');
          }
        })
    });


    /* Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // Get the class that is on the body element
        let body = document.querySelector('body');

        it('is hidden by default', function() {
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        /*Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should display when the menu icon is clicked and hide when clicked again', function() {
          $('.icon-list').trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(false);

          $('.icon-list').trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        it('should be loaded and contain at least one entry', function() {
          const feed = document.querySelector('.feed');
          expect(feed.children.length).toBeGreaterThan(0);
        });
    });
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstFeed;
        let secondFeed;

        beforeEach(function(done) {
          loadFeed(0, function() {
            firstFeed = document.querySelector(".feed").innerHTML;
            loadFeed(1, function() {
              secondFeed = document.querySelector(".feed").innerHTML;
              done();
            })
          });
        });

        it('changes content once a new feed has been loaded', function() {
          expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());
