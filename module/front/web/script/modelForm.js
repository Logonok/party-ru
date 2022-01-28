'use strict';

Vue.component('model-form', {
    props: {
        id: String,
        metaClass: String,
        metaView: String,
        readOnly: {
            type: Boolean,
            default: false
        },
        rootGroup: String,
        fileAttrs: {
            type: Array,
            default () {
                return [];
            }
        },
        visibleAttrs: Array,
        skipEmpty: {
            type: Boolean,
            default: true
        },
        translationCategory: {
            type: String,
            default () {
                return `meta.class.${this.metaClass}`;
            }
        }
    },
    data () {
        return {
            elements: []
        };
    },
    created () {
        this.load();
    },
    methods: {
        onChangeElement () {
            this.$emit('change');
        },
        getElementComponentName ({name, type, viewType}) {
            if (this.fileAttrs.includes(name)) {
                return 'model-form-file';
            }
            let result = this.formatElementComponentName(viewType);
            if (Vue.component(result)) {
                return result;
            }
            result = this.formatElementComponentName(type);
            return Vue.component(result) ? result : 'model-form-string';
        },
        formatElementComponentName (type) {
            return type ? `model-form-${Jam.StringHelper.camelToKebab(type)}` : null;
        },
        getRefElements () {
            return this.getRefArray('element');
        },
        getValue (name) {
            for (const ref of this.getRefElements()) {
                if (ref.name === name) {
                    return ref.serialize();
                }
            }
        },
        async load () {
            try {
                const meta = await this.loadMeta();
                const data = await this.loadData();
                await this.build(meta, data);
                this.$emit('load', data);
            } catch (err) {
                this.showError(err);
            }
        },
        async loadMeta () {
            const data = await this.fetchMeta('class', {
                class: this.metaClass
            });
            return this.metaView
                ? this.getMetaViewData(this.metaView, data)
                : data;
        },
        loadData () {
            return this.id
                ? this.loadInstanceData()
                : this.loadDefaultData();
        },
        loadInstanceData () {
            return this.fetchJson('read', {
                id: this.id,
                class: this.metaClass,
                view: this.metaView
            });
        },
        loadDefaultData () {
            return this.fetchJson('defaults', {
                class: this.metaClass,
                view: this.metaView
            });
        },
        getMetaViewData (name, data) {
            for (const view of data.views) {
                if (view.name === name) {
                    return view;
                }
            }
            throw new Error(`Meta view not found: ${name}`);
        },
        build (meta, data) {
            this.metaData = this.prepareClassElements(meta, data);
            this.root = this.rootGroup ? this.getGroup(this.rootGroup) : this.metaData;
            this.elements = this.root.elements;
        },
        getGroup (name) {
            if (Array.isArray(this.metaData.groups)) {
                for (const group of this.metaData.groups) {
                    if (group.name === name) {
                        return group;
                    }
                }
            }
        },
        prepareClassElements (meta, data) {
            if (meta.elements) {
                return meta;
            }
            const groupMap = Jam.ArrayHelper.index('name', meta.groups);
            const elements = [];
            for (const group of Object.values(groupMap)) {
                group._group = true;
                groupMap.hasOwnProperty(group.parent)
                    ? Jam.ObjectHelper.push(group, 'elements', groupMap[group.parent])
                    : elements.push(group);
            }
            for (const attr of meta.attrs) {
                this.prepareAttrData(attr, data);
                if (this.isVisibleAttr(attr)) {
                    groupMap.hasOwnProperty(attr.group)
                        ? Jam.ObjectHelper.push(attr, 'elements', groupMap[attr.group])
                        : elements.push(attr);
                }
            }
            const compare = (a, b) => a.orderNumber - b.orderNumber;
            for (const group of Object.values(groupMap)) {
                if (group.elements) {
                    elements.sort(compare);
                }
            }
            elements.sort(compare);
            meta.elements = elements;
            return meta;
        },
        isVisibleAttr (attr) {
            if (Array.isArray(this.visibleAttrs) && !this.visibleAttrs.includes(attr.name)) {
                return false;
            }
            return !attr.hidden && (!attr.readOnly || !this.skipEmpty || !this.isEmptyAttr(attr));
        },
        isEmptyAttr ({value}) {
            return value === null || value === '' || (Array.isArray(value) && !value.length);
        },
        prepareAttrData (attr, data) {
            attr.readOnly = this.readOnly || attr.readOnly;
            attr.value = data.hasOwnProperty(attr.name) ? data[attr.name] : '';
            attr.valueTitle = this.getValueTitle(attr.name, data);
        },
        validate () {
            this.clearErrors();
            this.getRefElements().forEach(ref => ref.validate());
            return !this.hasError();
        },
        clearErrors () {
            this.getRefElements().forEach(ref => ref.clearError());
        },
        hasError () {
            for (const ref of this.getRefElements()) {
                if (ref.hasError()) {
                    return true;
                }
            }
        },
        serialize () {
            const result = {};
            for (const ref of this.getRefElements()) {
                result[ref.name] = ref.serialize();
            }
            return result;
        },
        async reset () {
            const data = await this.loadData();
            for (const ref of this.getRefElements()) {
                ref.setValue(data.hasOwnProperty(ref.name) ? data[ref.name] : undefined);
            }
        }
    },
    template: '#model-form'
});