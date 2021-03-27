
Front.Member = class Member extends Front.Loadable {

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