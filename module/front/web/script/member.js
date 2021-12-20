'use strict';

Vue.component('member', {
    props: {
        member: String
    },
    data () {
        return {
            id: null,
            name: null,
            activeTab: 'toasts'
        };
    },
    async created () {
        await this.load();
    },
    methods: {
        async load () {
            const data = await this.fetchJson('read', {
                class: 'member',
                view: 'public',
                id: this.member
            });
            this.id = data._id;
            this.name = data.name;
        }
    },
    template: '#member'
});