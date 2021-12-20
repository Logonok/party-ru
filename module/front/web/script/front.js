'use strict';

const front = new Vue({
    el: '#front',
    props: {
        csrf: String,
        authUrl: String,
        dataUrl: String,
        metaUrl: String,
        userId: String
    },
    propsData: {
        ...document.querySelector('#front').dataset
    },
    data () {
        return {
            activePage: 'toasts',
            activeMember: null,
            activeToast: null
        };
    },
    computed: {
        activePageProps () {
            return {
                ...this.defaultPageProps,
                ...this.pagePros
            };
        },
        defaultPageProps () {
            return {};
        },
        pagePros () {
            switch (this.activePage) {
                case 'member':
                    return {
                        key: this.activeMember,
                        member: this.activeMember
                    };
                case 'toast':
                    return {
                        key: this.activeToast,
                        toast: this.activeToast
                    };
            }
        }
    },
    created () {
        this.$on('toast', this.onToast);
        this.$on('toasts', this.onToasts);
        this.$on('member', this.onMember);
    },
    methods: {
        onToast (id) {
            this.activePage = 'toast';
            this.activeToast = id;
        },
        onToasts () {
            this.activePage = 'toasts';
        },
        onMember (id) {
            this.activePage = 'member';
            this.activeMember = id;
        }
    }
});