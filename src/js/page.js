(function (window) {

    'use strict';

    class Organizer {

        /**
         * *This function is used to close all the child components of the parent component.*
         *
         * @param event - The event object that was passed to the close function.
         */

        close(event) {
            let parametrs = Object.getOwnPropertyNames(this);
            for (let item = 0; item < parametrs.length; item++) {
                if (typeof this[parametrs[item]].close !== 'function') continue;
                this[parametrs[item]].close(event);
            }
        }
    }

    /* It creates a class called Widget. */

    class Widget { }

    class Page {

        /**
         * This function returns a placeholder value for the column name
         * @returns The string '$'
         */

        static placehloder() {
            return '$';
        }

        /**
         * It returns a string.
         * @returns The handle() method returns a string.
         */

        static handle() {
            return 'data-handle-event';
        }

        /**
         * The constructor function creates an object that contains the widgets, elements, navigator,
         * and options
         */

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

        /**
         * It sets a function to a variable.
         * @param name - The name of the function.
         * @param func - The function to be called when the event is triggered.
         * @returns The object itself.
         */

        setFunction(name, func) {
            if (typeof func === 'function') this[name] = func;
            return this;
        }

        /**
         * If the object has a property with the given name, return that property. Otherwise, return
         * null
         * @param name - The name of the function.
         * @returns The function that is being called.
         */

        getFunction(name) {
            if (this.hasOwnProperty(name)) return this[name];
            return null;
        }

        /**
         * Get the events that are currently defined for the chart
         * @returns The events that are being returned are the events that are being passed into the
         * constructor.
         */

        getEvents() {
            return this.options.events;
        }

        /**
         * Set the navigator property of the JavaScript object
         * @param navigator - The navigator object that is used to navigate to other pages.
         */

        setNavigator(navigator) {
            this.navigator = navigator;
        }

        /**
         * Get the navigator object from the window object
         * @returns The navigator object.
         */

        getNavigator() {
            return this.navigator;
        }

        /**
         * Get the widgets from the page
         * @returns The getWidgets() method returns an array of widgets.
         */

        getWidgets() {
            return this.widgets;
        }

        /**
         * Get the navigator object and return a map of the application, module, and view names
         * @returns The navigator map.
         */

        getNavigatorMap() {
            let array = ['application', 'module', 'view'], navigator = this.getNavigator(), navigator_map = {};
            for (let item = 0; item < array.length; item++) {
                if (false === navigator.hasOwnProperty(item)) break;
                navigator_map[array[item]] = navigator[item];
            }
            return navigator_map;
        }

        /**
         * * Set the translate value of the options object
         * @param translate - The translation of the slider.
         */

        setTranslate(translate) {
            this.options.translate = translate;
        }

        /**
         * Get the translation for a given path
         * @param path - The path to the translation file.
         * @returns The translated path.
         */

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

        /**
         * * Set the policies for the user
         * @param policies - A list of policies to be applied to the user.
         */

        setUserPolicies(policies) {
            this.options.policies = policies;
        }

        /**
         * Check if the policy is in the list of policies
         * @param policy - The policy to check.
         * @returns The index of the policy in the list of policies.
         */

        checkPolicy(policy) {
            return this.options.policies.indexOf(policy) !== -1;
        }

        /**
         * Get the application object from the NavigatorMap
         * @returns The application object.
         */

        getApplication() {
            let map = this.getNavigatorMap();
            return map.application || null;
        }

        /**
         * Get the module name from the navigator map
         * @returns The module that the navigator is in.
         */

        getModule() {
            let map = this.getNavigatorMap();
            return map.module || null;
        }

        /**
         * Get the view from the navigator map
         * @returns The view from the navigator map.
         */

        getView() {
            let map = this.getNavigatorMap();
            return map.view || null;
        }

        /**
         * Add an HTML element to the page
         * @param html - The HTML element to add to the DOM.
         * @param immediately - If true, the element will be appended to the body immediately. If
         * false, the element will be appended to the body after the current script has finished
         * executing.
         * @returns The `addHTMLElement` method returns the `HTMLElement` object.
         */

        addHTMLElement(html, immediately) {
            this.elements.push(html);
            if (true === immediately) document.body.appendChild(html);
            return this;
        }

        /**
         * Add a function to the list of functions that will be called when the event is rendered
         * @param func - A function that will be called when the event is triggered.
         * @returns The calendar object.
         */

        addEventRender(func) {
            let events = this.getEvents();
            if (typeof func === 'function') events.push(func);
            return this;
        }

        /**
         * Get all the elements in the DOM that match the selector
         * @returns The elements of the array.
         */

        getElements() {
            return this.elements;
        }

        /**
         * * For each element in the array of elements, append it to the body of the document.
         * * For each event in the array of events, call it
         */

        out() {
            let elements = this.getElements(), events = this.getEvents();
            for (let item = 0; item < elements.length; item++)
                if (elements[item] instanceof HTMLElement)
                    document.body.appendChild(elements[item]);

            for (let item = 0; item < events.length; item++)
                if (typeof events[item] === 'function')
                    events[item].call(this);
        }

        /**
         * *This function is called when the user clicks the close button on the widget. It closes all
         * widgets.*
         * @param event - The event object that was passed to the close() method.
         */

        close(event) {
            let widgets = this.getWidgets();
            for (let x in widgets) {
                if (typeof widgets[x].close !== 'function') continue;
                widgets[x].close(event);
            }
        }

        /**
         * If the event target has a data-handle-event attribute, then execute the function that is the
         * value of the attribute
         * @param event - The event object that was passed to the event handler.
         */

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

        /**
         * Find the closest attribute to the target element
         * @param target - The element to search for the attribute.
         * @param attribute - The attribute to search for.
         * @param html - If true, the attribute is searched for in the HTML source code.
         * @returns The closest attribute.
         */

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

        /**
         * Given a URL, return the value of the specified parameter
         * @param parameter - The name of the parameter to get.
         * @returns The value of the parameter.
         */

        static getUrlParameter(parameter) {
            let url = window.location.search.substring(1), variables = url.split('&');
            for (let i = 0; i < variables.length; i++) {
                let name = variables[i].split('=');
                if (name[0] === parameter) return name[1] === undefined ? true : decodeURIComponent(name[1]);
            }
        }

        /**
         * *Adds an event listener to an element.*
         * 
         * @param input - The input element to add the event listener to.
         * @param handle - The name of the event to listen for.
         */

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
    window.Page.Widget = Widget;
    window.Page.Widget.Organizer = Organizer;

})(window);
