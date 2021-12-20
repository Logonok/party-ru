'use strict';

Vue.component('toast', {
    props: {
        toast: String
    },
    data () {
        return {
            id: null,
            title: null,
            content: null,
            author: null,
            authorName: null
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        async load () {
            const data = await this.fetchJson('read', {
                class: 'toast',
                view: 'public',
                id: this.toast
            });
            this.id = data._id;
            this.title = data.title;
            this.content = data.content;
            this.author = data.author?._id;
            this.authorName = data.author?._title;
        }
    },
    template: '#toast'
});