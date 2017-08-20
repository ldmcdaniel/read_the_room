'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /profile_view when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/profile_view");
  });


  describe('profile_view', function() {

    beforeEach(function() {
      browser.get('index.html#!/profile_view');
    });


    it('should render profile_view when user navigates to /profile_view', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('group_view', function() {

    beforeEach(function() {
      browser.get('index.html#!/group_view');
    });


    it('should render group_view when user navigates to /group_view', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
