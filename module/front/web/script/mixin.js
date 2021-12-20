'use strict';

Vue.filter('boolean', Jam.FormatHelper.asBoolean.bind(Jam.FormatHelper));
Vue.filter('datetime', Jam.FormatHelper.asDatetime.bind(Jam.FormatHelper));

Vue.mixin({
    data () {
        return {
            loading: false
        };
    },
    methods: {
        isGuest () {
            return !this.$root.userId;
        },
        getDataUrl (action) {
            return `${this.$root.dataUrl}/${action}`;
        },
        getMetaUrl (action) {
            return `${this.$root.metaUrl}/${action}`;
        },
        getRandomId () {
            return `${Date.now()}${Jam.Helper.random(10000, 99999)}`;
        },
        getRefArray (name) {
            const data = this.$refs[name];
            return Array.isArray(data) ? data : data ? [data] : [];
        },
        getValueTitle (key, data) {
            const item = data[key];
            if (item?.hasOwnProperty('_title')) {
                return item._title;
            }
            return data.hasOwnProperty(`${key}_title`) ? data[`${key}_title`] : item;
        },
        fetchJson (action, ...args) {
            return this.fetchByMethod('getJson', this.getDataUrl(action), ...args);
        },
        fetchMeta (action, ...args) {
            return this.fetchByMethod('getJson', this.getMetaUrl(action), ...args);
        },
        fetchText (action, ...args) {
            return this.fetchByMethod('getText', this.getDataUrl(action), ...args);
        },
        fetchByMethod (name, url, data, options) {
            try {
                const csrf = this.$root.csrf;
                this.loading = true;
                return (new Jam.Fetch)[name](url, {csrf, ...data}, options);
            } finally {
                this.loading = false;
            }
        },
        requireAuth () {
            if (this.isGuest()) {
                location.assign(this.$root.authUrl);
                return false;
            }
            return true;
        },
        toMain () {
            this.$root.$emit('toasts');
        },
        toToast () {
            this.$root.$emit('toast', ...arguments);
        },
        toMember () {
            this.$root.$emit('member', ...arguments);
        },
        showError () {
            Jam.dialog.error(...arguments);
        }
    }
});