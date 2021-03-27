
Front.Page = class Page extends Front.Element {

    init () {
        this.name = this.getData('page');
        this.front.on('show:page', this.onPage.bind(this));
    }

    onPage (event, data) {
        if (this.name === data.name) {
            this.activate(data);
        }
    }

    activate () {
        this.front.togglePage(this.name);
    }

    showPage () {
        this.front.showPage(this.name, ...arguments);
    }
};

Front.MainPage = class MainPage extends Front.Page {
};

Front.MemberPage = class MemberPage extends Front.Page {

    init () {
        super.init();
        this.member = this.getHandler('Member');
        this.front.on('action:member', this.onMember.bind(this));
    }

    onMember (event, {member}) {
        this.showPage();
        this.member.setInstance(member);
    }
};

Front.ToastPage = class ToastPage extends Front.Page {

    init () {
        super.init();
        this.toast = this.getHandler('Toast');
        this.front.on('action:toast', this.onToast.bind(this));
    }

    onToast (event, {toast}) {
        this.showPage();
        this.toast.setInstance(toast);
    }
};