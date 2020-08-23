'use strict';

Front.CommentList = class CommentList extends Front.LoadableContent {

    init () {
        super.init();
        this.pagination = new Front.Pagination(this);
        this.pagination.pageSize = 10;
        this.on('change:pagination', this.onChangePagination.bind(this));
    }

    getUrl (action = 'list') {
        return super.getUrl(action);
    }

    getPostData () {
        return {
            class: 'comment',
            view: 'public',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize()
        };
    }

    onChangePagination () {
        this.load();
    }

    resolveTemplate (name, data) {
        return super.resolveTemplate(name, data, '##', '##');
    }

    render (data) {
        let items = data && data.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.renderItem, this).join('') || this.resolveTemplate('empty');
        return this.resolveTemplate('list', {items});
    }

    renderItem (data) {
        data.authorId = data.author._id;
        data.authorTitle = data.author._title;
        data.date = Jam.FormatHelper.asDatetime(data._createdAt);
        data.text = Front.escapeHtml(data.text);
        return this.resolveTemplate('item', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};

Front.ToastCommentList = class ToastCommentList extends Front.CommentList {

    init () {
        super.init();
        this.toast = this.getData('toast');
        this.load();
    }

    getUrl (action = 'list-related') {
        return super.getUrl(action);
    }

    getPostData () {
        return Object.assign(super.getPostData(), {
            master: {
                class: 'toast',
                attr: 'comments',
                id: this.toast
            }
        });
    }
};