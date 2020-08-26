'use strict';

const Base = require('evado-module-studio/Module');

module.exports = class StudioModule extends Base {

    static getConstants ()  {
        return {
            BEHAVIORS: {
                'access': {
                    Class: require('areto/filter/AccessControl'),
                    rules: [{
                        allow: false,
                        controllers: ['export', 'import']
                    }, {
                        allow: true,
                        actions: ['index', 'create', 'update', 'select'],
                        methods: ['GET']
                    }, {
                        allow: true,
                        actions: ['list', 'list-related']
                    }, {
                        allow: false
                    }]
                }
            }
        };
    }

    constructor (config) {
        super({
            original: Base,
            ...config
        });
    }
};
module.exports.init(module);