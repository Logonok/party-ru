'use strict';

// evado/web/jam/utility/I18n.js

// extend default translation category
// use: <span data-t="">Some text</span>
// use: <div title="Some text"></div>
// use: <input placeholder="Some text" type="text" />

Object.assign(Jam.I18n.defaults, {

});

// define custom translation category
// use: <span data-t="custom">Any text</span>
// use: <div data-t="custom" title="Any text"></div>
// use: <input data-t="custom" placeholder="Any text" type="text"/>
// use: <div data-t-title="customTitle" title="Any title" data-t="custom">Any text</div>

Jam.I18n.custom = {

    'Any text': 'Любой текст'
};

Jam.I18n.customTitle = {

    'Any title': 'Любой заголовок'
};

// METADATA

Jam.I18n.meta = {

};