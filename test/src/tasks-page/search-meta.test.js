var Config = require('../../../lib/config'),
    Model = require('../../../lib/model/model'),
    PageSearchMeta = require('../../../lib/tasks-page/search-meta');

describe('PageSearchMeta', function() {
    var task,
        model = new Model(),
        pages = [
            {url: '/', title: '/ title'},
            {url: '/url1', title: 'url1 title', tags: ['tag1', 'tag2']}
        ];

    beforeEach(function() {
        task = new PageSearchMeta(new Config('debug'), {});
        model.setPages(pages);
    });

    it('should return valid task name', function() {
        PageSearchMeta.getName().should.equal('create page search meta-information');
    });

    it('should set valid search meta-information for page without tags', function() {
        return task.run(model).then(function(result) {
            result.getPages()[0].meta.should.eql({
                breadcrumbs: [
                    {url: '/', title: '/ title'}
                ],
                fields: {
                    type: 'doc',
                    keywords: []
                }
            });
        });
    });

    it('should set valid search meta-information for tagged pages', function() {
        return task.run(model).then(function(result) {
            result.getPages()[1].meta.should.eql({
                breadcrumbs: [
                    {url: '/', title: '/ title'},
                    {url: '/url1', title: 'url1 title'}
                ],
                fields: {
                    type: 'doc',
                    keywords: ['tag1', 'tag2']
                }
            });
        });
    });
});