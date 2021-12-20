'use strict';

Vue.component('comment-form', {
    extends: Vue.component('model-form'),
    methods: {
        loadMeta () {
            const attrs = [{
                name: 'text',
                label: 'Текст',
                type: 'text',
                required: true
            }];
            return {attrs};
        },
        loadData () {
            return {};
        }
    }
});