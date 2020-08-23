'use strict';

module.exports = [{
    description: 'Создать участника при регистрации пользователя',
    events: ['auth.register'],
    handlers: ['memberInstantiation']
}];