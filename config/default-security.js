'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Полный доступ к данным',
        roles: 'administrator',
        type: 'allow',
        actions: 'all',
        targets: {type: 'all'}
    }, {
        description: 'Изменять собственного участника',
        roles: 'user',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'class',
            class: 'member'
        },
        rules: 'creator'
    }, {
        description: 'Управлять собственными тостами',
        roles: 'user',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'class',
            class: 'toast'
        },
        rules: 'creator'
    }, {
        description: 'Просматривать тосты, к которым есть доступ',
        roles: 'user',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: 'toast'
        },
        rules: 'toast'
    }, {
        description: 'Управлять собственными комментариями',
        roles: 'user',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: 'comment'
        },
        rules: 'creator'
    }, {
        description: 'Читать и создавать комментарии к тостам, к которым есть доступ',
        roles: 'user',
        type: 'allow',
        actions: ['create', 'read'],
        targets: {
            type: 'class',
            class: 'comment'
        },
        rules: 'comment'
    }, {
        description: 'Просматривать участников и друзей',
        roles: 'user',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: ['friend', 'member']
        }
    }, {
        description: 'Создавать и удалять собственных друзей',
        roles: 'user',
        type: 'allow',
        actions: ['create', 'delete'],
        targets: {
            type: 'class',
            class: 'friend'
        },
        rules: 'creator'
    }, {
        description: 'Изменять дружбу, если являешься приглашенным участником',
        roles: 'user',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'friend'
        },
        rules: 'invitee'
    }, {
        description: 'Просматривать объекты под гостевой ролью',
        roles: 'guest',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'view',
            class: ['member', 'toast', 'comment'],
            view: 'public'
        }
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Модуль администрирования',
            description: 'Доступ к модулю Администрирования'
        },
        'moduleOffice': {
            label: 'Модуль Офис',
            description: 'Доступ к модулю Офис'
        },
        'moduleStudio': {
            label: 'Модуль Студия',
            description: 'Доступ к модулю Студия'
        },
        'moduleApiBaseUpload': {
            label: 'Загрузка файлов',
            description: 'Загрузка файлов через модуль API базовых метаданных'
        }
    },

    roles: {
        'administrator': {
            label: 'Администратор',
            description: 'Полный доступ',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Гость',
            description: 'Автоматически назначаемая роль для анонимных пользователей'
        },
        'user': {
            label: 'Пользователь',
            description: 'Роль по умолчанию для аутентифицированных пользователей',
            children: [
                'moduleOffice',
                'moduleApiBaseUpload'
            ]
        }
    },

    rules: {
        'author': {
            label: 'Автор',
            description: 'Является ли пользователь автором',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'author'
            }
        },
        'comment': {
            label: 'Комментарий',
            description: 'Комментируемый тост доступен для друзей и пользователь друг автора или доступен для всех',
            config: {
                Class: 'component/meta/rbac/rule/CommentRule'
            }
        },
        'creator': {
            label: 'Создатель',
            description: 'Является ли пользователь создателем объекта',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                userAttr: '_creator'
            }
        },
        'invitee': {
            label: 'Приглашенный',
            description: 'Является ли пользователь приглашенным',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'invitee'
            }
        },
        'toast': {
            label: 'Тост',
            description: 'Тост доступен для друзей и пользователь друг автора или доступен для всех',
            config: {
                Class: 'component/meta/rbac/rule/ToastRule'
            }
        },
        'user': {
            label: 'Пользователь',
            description: 'Является ли пользователем связанным с объектом',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule'
            }
        }
    },

    // привязка пользователй к ролям
    assignments: {
        'Adam': 'administrator'
    },

    // правила автоматической привязки пользователей к ролям
    assignmentRules: {
    }
};