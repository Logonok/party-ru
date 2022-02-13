'use strict';

const Base = require('evado/Application');

module.exports = class PartyApplication extends Base {

    constructor (config) {
        super({
            original: Base,
            ...config
        });
    }

    isDemo () {
        return this.configName === 'demo';
    }
};
module.exports.init(module);