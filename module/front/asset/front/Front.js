'use strict';

class Front {

    static getElementClass (name) {
        return this[name]?.prototype instanceof this.Element ? this[name] : null;
    }

    static toggle ($element, state) {
        return $element.toggleClass('hidden', !state);
    }

    static getTemplate (name, container) {
        return container.querySelector(`template[data-id="${name}"]`)?.innerHTML;
    }

    static resolveTemplate (text, data, start = '{{', end = '}}') {
        const regex = new RegExp(`${start}(\\w+)${end}`, 'gm');
        return text.replace(regex, (match, key)=> {
            const value = data[key];
            return data.hasOwnProperty(key) && value !== undefined && value !== null ? value : '';
        });
    }

    static setPageTitle (text) {
        const $title = $(document.head).find('title');
        const base = $title.data('title');
        text = Jam.t(text);
        $title.html(text ? `${text} - ${base}` : base);
    }

    static escapeData (data, keys) {
        for (const key of keys || Object.keys(data)) {
            data[key] = this.escapeHtml(data[key]);
        }
    }

    static escapeHtml (value) {
        return typeof value === 'string' ? value.replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
    }

    static createHandlers (front, container) {
        const handlers = [];
        for (const element of container.querySelectorAll('[data-handler]')) {
            const name = $(element).data('handler');
            if (typeof name === 'string') {
                const Class = this.getElementClass(name);
                if (Class) {
                    handlers.push(new Class(element, front));
                } else {
                    console.error(`Handler not found: ${name}`);
                }
            }
        }
        for (const handler of handlers) {
            if (handler.init) {
                handler.init();
            }
        }
    }

    constructor () {
        this.ajaxQueue = new this.constructor.AjaxQueue;
        this.$container = $('.front');
        this.meta = new this.constructor.Meta(this);
        this.constructor.createHandlers(this, document);
        this.on('click', '.nav-link', this.onTab.bind(this));
        this.on('click', '.form-set-toggle', this.onGroup.bind(this));
        this.on('click', '[data-action="main"]', this.onMain.bind(this));
        this.on('click', '[data-action="member"]', this.onMember.bind(this));
        this.on('click', '[data-action="toast"]', this.onToast.bind(this));
        this.on('action:auth', this.onAuth.bind(this));
    }

    isGuest () {
        return this.getData('guest');
    }

    isUser (id) {
        return id && this.getData('user') === id;
    }

    getData (key) {
        return this.$container.data(key);
    }

    showPage (name, data) {
        this.trigger('show:page', Object.assign({name}, data));
    }

    getActivePage () {
        return this.getPages().filter(`.active`);
    }

    getPage (name) {
        return this.getPages().filter(`[data-page="${name}"]`);
    }

    getPages () {
        return this.$container.children('.page');
    }

    togglePage (name) {
        this.getPages().removeClass('active');
        this.getPage(name).addClass('active');
    }

    getActionTarget (event, key = 'id') {
        return $(event.currentTarget).closest(`[data-${key}]`).data(key);
    }

    getHandler (name) {
        return this.$container.find(`[data-handler="${name}"]`).data('handler');
    }

    getAuthAction (action) {
        return `action:${this.isGuest() ? 'auth' : action}`;
    }

    toggleLoader (state) {
        $('.global-loader').toggle(state);
        $(document.body).toggleClass('loading', state);
    }

    on () {
        this.$container.on(...arguments);
    }

    trigger () {
        this.$container.trigger(...arguments);
    }

    onTab (event) {
        event.preventDefault();
        const $nav = $(event.currentTarget);
        const id = $nav.data('id');
        const $tabs = $nav.closest('.tabs');
        const $content = $tabs.children('.tab-content');
        $nav.parent().children('.active').removeClass('active');
        $content.children('.active').removeClass('active');
        $nav.addClass('active');
        $content.children(`[data-id="${id}"]`).addClass('active');
        $tabs.trigger('tab:active', {id});
    }

    onGroup (event) {
        $(event.currentTarget).closest('.form-set').toggleClass('active');
    }

    onMain (event) {
        event.preventDefault();
        this.showPage('main');
    }

    onAuth (event) {
        event.preventDefault();
        location.assign('auth/sign-in?returnUrl=/front');
    }

    onMember (event) {
        event.preventDefault();
        this.trigger('action:member', {member: this.getActionTarget(event)});
    }

    onToast (event) {
        event.preventDefault();
        this.trigger('action:toast', {toast: this.getActionTarget(event)});
    }
}