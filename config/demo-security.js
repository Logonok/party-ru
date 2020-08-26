'use strict';

module.exports = {

    metaPermissions: [{
        description: 'Demo access',
        roles: ['guest', 'user'],
        type: 'allow',
        actions: 'read',
        targets: {type: 'all'}
    }],

    permissions: {
        'demo': {
            label: 'Demo',
            description: 'Read-only permission'
        }
    },

    roles: {
        'guest': {
            children: [
                'demo',
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio'
            ]
        },
        'user': {
            children: [
                'demo',
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio'
            ]
        }
    },

    assignments: {
        'Adam': 'user'
    }
};