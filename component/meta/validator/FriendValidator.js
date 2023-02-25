'use strict';
/*
* проверить существует ли уже объект Друг, в котором
* текущие участники являются Приглашающими и Приглашенными
* */
const Base = require('evado-meta-base/validator/Validator');

module.exports = class FriendValidator extends Base {

    async validateAttr (name, model) {
        const members = [
            model.get('inviter'),
            model.get('invitee')
        ];
        const query = model.class.find({
            inviter: members,
            invitee: members
        });
        const id = await query.id();
        if (id && !model.isId(id)) {
            model.addError(name, this.getMessage());
        }
    }

    getMessage () {
        return this.createMessage(this.message, 'Friend already exists');
    }
};