(function (window) {

    'use strict';

    class Page {

        static placehloder() {
            return '$';
        }
        static handle() {
            return 'data-handle-event';
        }

        constructor() {
            this.widgets = {};
            this.elements = [];
            this.navigator = [];
            this.options = {
                translate: {},
                policies: [],
                events: []
            }
        }

        setFunction(name, func) {
            if (typeof func === 'function') this[name] = func;
            return this;
        }
        getFunction(name) {
            if (this.hasOwnProperty(name)) return this[name];
            return null;
        }
        getEvents() {
            return this.options.events;
        }
        setNavigator(navigator) {
            this.navigator = navigator;
        }
        getNavigator() {
            return this.navigator;
        }
        getWidgets() {
            return this.widgets;
        }
        getNavigatorMap() {
            let array = ['application', 'module', 'view'], navigator = this.getNavigator(), navigator_map = {};
            for (let item = 0; item < array.length; item++) {
                if (false === navigator.hasOwnProperty(item)) break;
                navigator_map[array[item]] = navigator[item];
            }
            return navigator_map;
        }
        setTranslate(translate) {
            this.options.translate = translate;
        }
        getTranslate(path) {
            let path_split = path.split(String.fromCharCode(46)), matrioska = this.options.translate;
            for (let item = 0; item < path_split.length; item++) {
                if (false === matrioska.hasOwnProperty(path_split[item])) return path;
                matrioska = matrioska[path_split[item]];
            }
            if (typeof matrioska !== 'string') return path;

            let placehloder = this.constructor.placehloder();
            for (let item = 1; item < arguments.length; item++) {
                let replacer = item - 1;
                matrioska = matrioska.replace(placehloder + replacer, arguments[item]);
            }
            return matrioska;
        }
        setUserPolicies(policies) {
            this.options.policies = policies;
        }
        checkPolicy(policy) {
            return this.options.policies.indexOf(policy) !== -1;
        }
        getApplication() {
            let map = this.getNavigatorMap();
            return map.application || null;
        }
        getModule() {
            let map = this.getNavigatorMap();
            return map.module || null;
        }
        getView() {
            let map = this.getNavigatorMap();
            return map.view || null;
        }
        addHTMLElement(html, immediately) {
            this.elements.push(html);
            if (true === immediately) document.body.appendChild(html);
            return this;
        }
        addEventRender(func) {
            let events = this.getEvents();
			if (typeof func === 'function') events.push(func);
            return this;
        }
        getElements() {
            return this.elements;
        }
        out() {
            let elements = this.getElements(), events = this.getEvents();
            for (let item = 0; item < elements.length; item++)
                if (elements[item] instanceof HTMLElement)
                    document.body.appendChild(elements[item]);

            for (let item = 0; item < events.length; item++)
                if (typeof events[item] === 'function')
                    events[item].call(this);
        }
        close(event) {
            let widgets = this.getWidgets();
            for (let x in widgets) {
                if (typeof widgets[x].close !== 'function') continue;
                widgets[x].close(event);
            }
        }
        handleEvent(event) {
            let attribute = this.constructor.closestAttribute(event.target, 'data-handle-event');
            if (attribute === null) return;

            let attribute_split = attribute.split(/\s+/);
            for (let item = 0; item < attribute_split.length; item++) {
                let execute = attribute_split[item].split(String.fromCharCode(58));
                if (execute.length !== 2) break;
                if (execute[0] === event.type || 0 === execute[0].length) {
                    if (typeof this[execute[1]] !== 'function') continue;

                    this[execute[1]].call(this, event);
                }
            }
        }
        static closestAttribute(target, attribute, html) {
            if (typeof attribute === 'undefined'
                || !attribute.length) return null;

            let result = null, element = target;

            do {
                let tagname = element.tagName.toLowerCase();
                if (tagname === 'body') return null;

                result = element.getAttribute(attribute);
                if (result !== null) {
                    result = result.toString();
                    if (result.length) break;
                }

                element = element.parentNode;
            } while (element !== null
                || typeof element === 'undefined');

            if (typeof html === 'undefined'
                || html !== true) return result;

            return element;
        }
        static getUrlParameter(parameter) {
            let url = window.location.search.substring(1), variables = url.split('&');
            for (let i = 0; i < variables.length; i++) {
                let name = variables[i].split('=');
                if (name[0] === parameter) return name[1] === undefined ? true : decodeURIComponent(name[1]);
            }
        }
        addAttribute(input, handle) {
            let listener = input.getAttribute(this.constructor.handle()), execute = handle.split(':');
            if (execute.length !== 2
                || 0 === execute[0].length) return this;

            listener = listener === null || 0 === listener.length ? [] : listener.split(/\s+/);
            listener.push(handle);

            input.setAttribute(this.constructor.handle(), listener.join(String.fromCharCode(32)));
            input.addEventListener(execute[0], window.page, false);

            return this;
        }
    };

    window.Page = Page;

})(window);