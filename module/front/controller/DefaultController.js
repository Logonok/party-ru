'use strict';

const Base = require('evado/component/base/BaseController');

module.exports = class DefaultController extends Base {

    actionIndex () {
        return this.render('index');
    }
};
module.exports.init(module);