'use strict';

module.exports = {

    parent: 'default',
    port: 3000,

    modules: {
        'studio': {
            Class: require('../module/studio/Module')
        },
        'admin': {
            Class: require('../module/admin/Module')
        },
    },
    security: require('./demo-security'),
    params: {
        'enablePasswordChange': false,
        'enableSignUp': false,
        'static': {options: {maxAge: 60 * 60 * 1000}},
        'serverAddress': 'http://localhost:3000'
    }
};