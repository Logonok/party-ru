'use strict';

Vue.component('comments', {
    props: {
        pageSize: {
            type: Number,
            default: 5
        },
        toast: String
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
        onNew () {
            if (this.requireAuth()) {
                this.$refs.newModal.show();
            }
        },
        onCreate () {
            const form = this.$refs.newForm;
            if (form.validate()) {
                this.$refs.newModal.hide();
                this.create(form.serialize());
            }
        },
        async create (data) {
            try {
                await this.fetchText('create', {
                    class: "comment",
                    master: this.getMasterData(),
                    data
                });
                await this.reload();
            } catch (err) {
                this.showError(err);
            }
        },
        setOwnerLink () {
        },
        async reload () {
            await this.load(0);
        },
        async load (page) {
            const data = await this.fetchJson('list', {
                class: 'comment',
                view: 'public',
                master: this.getMasterData(),
                length: this.pageSize,
                start: page * this.pageSize
            });
            const pageSize = this.pageSize;
            this.$emit('load', {...data, pageSize, page});
        },
        getMasterData () {
            return {
                class: 'toast',
                attr: 'comments',
                id: this.toast
            };
        },
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                text: item.text,
                date: item._createdAt,
                author: item.author?._id,
                authorName: item.author?.name
            }));
        },
    },
    template: '#comments'
});