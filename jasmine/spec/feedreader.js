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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('Empty URL\'s', function() {
             allFeeds.forEach(function(value) {
                 expect(value.url).toBeDefined();
                 expect(value.url.length).not.toBe(0);
             });
         });


        /*loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Defined name', function() {
             allFeeds.forEach(function(value) {
                 expect(value.name).toBeDefined();
                 expect(value.name.length).not.toBe(0);
             });
         });
     });



     /*new test suite named "The menu" */

     describe('Menu', function() {
         /*Test that ensures the menu element is
          * hidden by default.
          */
         it('hidden by default', function() {
             expect(document.body.classList).toContain('menu-hidden');
         });
         /* Test that ensures the menu changes
           * visibility when the menu icon is clicked.
           * The menu display when
           * clicked and does it hide when clicked again.
           */
         it('changes visibility by clicking icon', function() {
             var icon = $('.menu-icon-link');
             // menu stays open
             icon.click();
             expect(document.body.classList).not.toContain('menu-hidden');
             // menu stays hidden
             icon.click();
             expect(document.body.classList).toContain('menu-hidden');
         });
     });

     /*New test suite named "Initial Entries" */
     describe('Initial Entries', function() {
         /* Test that ensures when the loadFeed
          * function is called and completes its work.
          * loadFeed() is asynchronous using beforeEach and asynchronous done() function.
          */
         beforeEach(function(done) {
             // used done() for a callback on loadFeed(id, cb);
             loadFeed(0, done);
         });

         it('have at least one entry displayed', function() {
             expect($('.feed .entry').length).toBeGreaterThan(0);
         });
     });

     /* New test suite named "New Feed Selection"*/
     describe('New Feed Selection', function() {
         /* Test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          */
         it('loaded feed content changes', function(done) {
             //Feed variables to test
             var firstFeed,
                 secondFeed;

             loadFeed(0, function() {
                 firstFeed = $('.feed').html();
                 loadFeed(1, function() {
                     secondFeed = $('.feed').html();
                     expect(firstFeed).not.toEqual(secondFeed);
                     done();
                 });
             });
         });
     });

}());
