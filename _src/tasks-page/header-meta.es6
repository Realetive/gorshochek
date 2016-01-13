import _ from 'lodash';
import PageBase from './base';

export default class PageHeaderMeta extends PageBase {

    /**
     * Returns logger module
     * @returns {module|Object|*}
     * @static
     */
    static getLoggerName() {
        return module;
    }

    /**
     * Return task human readable description
     * @returns {String}
     * @static
     */
    static getName() {
        return 'create page header meta-information';
    }

    /**
     * Performs task
     * @returns {Promise}
     * @public
     */
    run(model) {
        /*
         Для каждой страницы создаем
         поле header.meta в котором находится структура содержащая мета-информацию для header страницы.
          - ogUrl
          - ogType
          - description
          - ogDescription
          - keywords
          - ogKeywords
         */
        const getKeywords = p => {return p.tags ? p.tags.join(', ') : '';};
        return super.run(model, page => {
            _.chain(page)
                .set('header.meta', _({})
                    .set('ogUrl', page.url)
                    .set('ogType', 'article')
                    .set('description', page.title)
                    .set('ogDescription', page.title)
                    .set('keywords', getKeywords(page))
                    .set('ogKeywords', getKeywords(page))
                    .value())
                .value();
        });
    }
}
