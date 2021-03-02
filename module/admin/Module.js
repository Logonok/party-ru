'use strict';

const Base = require('evado-module-admin/Module');

module.exports = class AdminModule extends Base {

    static getConstants ()  {
        return {
            BEHAVIORS: {
                'access': {
                    Class: require('areto/filter/AccessControl'),
                    rules: [{
                        allow: false,
                        controllers: ['log', 'table']
                    }, {
                        allow: true,
                        actions: [
                            'index',
                            'create',
                            'update',
                            'select',
                            'permissions',
                            'roles',
                            'updatePermission',
                            'updateRole'
                        ],
                        methods: ['get']
                    }, {
                        allow: true,
                        actions: [
                            'list',
                            'listRelated',
                            'listPermission',
                            'listRole'
                        ]
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