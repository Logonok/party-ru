'use strict';
/*
* найти объекты класса Участник через связь в классе Друг,
* которые находятся в состоянии Принято
* И текущий пользователь является либо Приглашающим, либо Приглашенным.
* Кроме того исключить из Участников текущего пользователя
* */
const Base = require('areto/base/Base');

module.exports = class FriendMembers extends Base {

    async apply (query, member) {
        const memberId = member.getId();
        const friendClass = member.class.meta.getClass('friend');
        const friendQuery = friendClass.find()
            .and({_state: 'accepted'})
            .and(['OR', {inviter: memberId}, {invitee: memberId}]);
        const items = await friendQuery.raw().all();
        const memberIds = [];
        for (const item of items) {
            memberIds.push(item.inviter, item.invitee);
        }
        const key = member.class.getKey();
        query.and({[key]: memberIds}).and(['!=', key, memberId]);
    }
};