var Model = require('../../../lib/model'),
    createBreadcrumbs = require('../../../lib/tasks-page/breadcrumbs');

describe('tasks-pages/breadcrumbs', function() {
    var model = new Model(),
        pages = [
            {url: '/', title: 'index title'},
            {url: '/url1', title: 'url1 title'},
            {url: '/url1/url2', title: 'url2 title'}
        ];

    beforeEach(function() {
        model.setPages(pages);
    });

    it('should return function as result', function() {
        createBreadcrumbs(model).should.be.instanceOf(Function);
    });

    it('should create valid breadcrumbs model for index page', function() {
        return createBreadcrumbs(model)().then(function(result) {
            result.getPages()[0].breadcrumbs.should.eql([{url: '/', title: 'index title'}]);
        });
    });

    it('should create valid breadcrumbs model for first-level pages', function() {
        return createBreadcrumbs(model)().then(function(result) {
            result.getPages()[1].breadcrumbs.should.eql([
                {url: '/', title: 'index title'},
                {url: '/url1', title: 'url1 title'}
            ]);
        });
    });

    it('should create valid breadcrumbs model for second-level pages', function() {
        return createBreadcrumbs(model)().then(function(result) {
            result.getPages()[2].breadcrumbs.should.eql([
                {url: '/', title: 'index title'},
                {url: '/url1', title: 'url1 title'},
                {url: '/url1/url2', title: 'url2 title'}
            ]);
        });
    });
});

