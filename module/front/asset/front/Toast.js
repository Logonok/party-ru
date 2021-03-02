
Front.Toast = class Toast extends Front.Loadable {

    getUrl () {
        return super.getUrl('read');
    }

    getPostData () {
        return {
            class: 'toast',
            view: 'public',
            id: this.id
        };
    }

    render (data) {
        if (data.author) {
            data.authorId = data.author._id;
            data.authorTitle = data.author._title;
        }
        data.content = Front.escapeHtml(data.content);
        return this.resolveTemplate('toast', data);
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};