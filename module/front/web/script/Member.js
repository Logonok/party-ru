'use strict';

Front.Member = class Member extends Front.LoadableContent {

    getUrl () {
        return super.getUrl('read');
    }

    getPostData () {
        return {
            class: 'member',
            view: 'public',
            id: this.id
        };
    }

    render (data) {
        return this.resolveTemplate('member', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};

Front.MemberList = class MemberList extends Front.LoadableContent {

    constructor () {
        super(...arguments);
        this.noItemsFound = 'Не найдены участники';
        this.pageSize = 8;
    }

    init () {
        super.init();
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = this.pageSize;
        this.on('change:pagination', this.onChangePagination.bind(this));
        this.load();
    }

    getUrl (action = 'list') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'member',
            view: 'public',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize()
        };
    }

    onChangePagination () {
        this.load();
    }

    onDone (data) {
        super.onDone(data);
        this.pagination.setTotal(data && data.totalSize);
        this.$content.append(this.pagination.render());
        this.translateContainer();
    }

    render (data) {
        let items = data && data.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.renderItem, this).join('');
        return items
            ? this.resolveTemplate('list', {items})
            : this.resolveTemplate('warning', {text: Jam.i18n.translate(this.noItemsFound)});
    }

    renderItem (data) {
        return this.resolveTemplate('item', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};

Front.MemberFriendList = class MemberFriendList extends Front.MemberList {

    constructor () {
        super(...arguments);
        this.member = this.getData('member');
        this.noItemsFound = 'Друзья не найдены';
        this.pageSize = 6;
    }

    getUrl (action = 'list-related') {
        return super.getUrl(action);
    }

    getPostData () {
        return Object.assign(super.getPostData(), {
            master: {
                class: 'member',
                attr: 'friends',
                id: this.member
            }
        });
    }

    resolveTemplate (name, data) {
        return super.resolveTemplate(name, data, '##', '##');
    }
};