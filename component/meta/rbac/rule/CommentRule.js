'use strict';
/*
* Участник может читать комментарии к тосту с доступом Все.
* Участник может читать комментарии к тосту с доступом Друзья, если он друг автора тоста
*/
const Base = require('./ToastRule');

module.exports = class CommentRule extends Base {

    async execute () {
        if (this.isObjectTarget()) {
            const toast = await this.getTarget().related.resolve('toast');
            return this.checkAccess(toast);
        }
        if (this.params.model) {
            return this.checkAccess(this.params.model);
        }
        return true;
    }

    async getObjectFilter () { // фильтрует объекты в списке
        const friends = await this.getFriendIds();
        const items = await this.getToastIds(friends);
        return items.length ? {toast: items} : null;
    }

    getToastIds (friends) {
        const condition = ['or', {access: 'all'}];
        if (friends.length) {
            condition.push({
                access: 'friends',
                author: friends
            });
        }
        return this.getBaseMeta().getClass('toast').find(condition).ids();
    }
};