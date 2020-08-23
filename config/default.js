'use strict';

module.exports = {

    title: 'Boilerplate',

    components: {
        'db': {
            settings: {
                'database': process.env.MONGO_NAME || 'evado-boilerplate',
            }
        },
        'cookie': {
            secret: 'boilerplate.evado'
        },
        'session': {
            secret: 'boilerplate.evado'
        },
        'i18n': {
            // language: 'ru'
        },
        'router': {
            // defaultModule: 'front'
        }
    },
    metaModels: {
        'base': {
            Class: require('evado-meta-base/base/BaseMeta')
        },
        'navigation': {
            Class: require('evado-meta-navigation/base/NavMeta')
        }
    },
    modules: {
        'api': {
            config: {
                modules: {
                    'base': {
                        Class: require('evado-api-base/Module')
                    },
                    'navigation': {
                        Class: require('evado-api-navigation/Module')
                    }
                }
            }
        },
        'studio': {
            Class: require('evado-module-studio/Module')
        },
        'office': {
            Class: require('../module/office/Module')
        },
        'account': {
            Class: require('evado-module-account/Module')
        },
        'admin': {
            Class: require('evado-module-admin/Module'),
            params: {
                separateNextCommonMenuItem: true
            }
        }
    },
    users: require('./default-users'),
    userFilters: require('./default-userFilters'),
    security: require('./default-security'),
    notices: require('./default-notices'),
    tasks: require('./default-tasks'),
    utilities: require('./default-utilities'),
    eventHandlers: require('./default-eventHandlers'),
    listeners: require('./default-listeners'),
    params: {
        'enablePasswordReset': false,
        'enableSignUp': false,
        'enableSignUpVerification': false
    }
};