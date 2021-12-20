'use strict';

Vue.component('toasts', {
    props: {
        pageSize: {
            type: Number,
            default: 6
        }
    },
    data () {
        return {
            items: []
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'toast',
                view: 'public',
                length: this.pageSize,
                start: page * this.pageSize
            });
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                title: item.title,
                authorName: item.author?._title
            }));
        },
    },
    template: '#toasts'
});