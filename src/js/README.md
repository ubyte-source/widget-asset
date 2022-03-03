# Documentation widget-asset

This repository contain a most common asset used on microservice ecosystem project from Energia Europa

## Usage

So the basic setup looks something like this:

```

<script src="page.js"></script>

```

In your page instance a class for use the property everywhere.
All widget created for this developer use a close method for perform a reset of front-end every mouse click event trigger on document.
If you are include wawes.js you can use a commented code on DOMContentLoaded closure.

```

window.page = new Page();
window.page.setNavigator(<current url path>);
window.page.host = '<current host>';


document.addEventListener('DOMContentLoaded', function () {
  window.page.out();

  // if you include waves.js

  // Waves.attach('.btn', ['waves-button', 'waves-float', 'waves-light']);
  // Waves.attach('.btn-flat', ['waves-button']);
  // Waves.init();
});

document.addEventListener('click', function (ev) {
  window.page.close(ev);
});

```

## Structure

library:
- [window.Page](https://github.com/energia-source/widget-asset#class-windowbutton-usable-methods)
- [window.Page.Widget](https://github.com/energia-source/widget-asset#class-windowbuttonicon-usable-methods)
- [window.Page.Widget.Organizer](https://github.com/energia-source/widget-asset#class-windowbuttonloader-usable-methods)

<br>

#### ***Class window.Page usable methods***

##### `static placehloder()`

This function returns a placeholder value for the column name

 * **Returns:** `h` — string '$'

##### `static handle()`

It returns a string.

 * **Returns:** `h` — handle() method returns a string.

##### `constructor()`

The constructor function creates an object that contains the widgets, elements, navigator, and options

##### `setFunction(name, func)`

It sets a function to a variable.

 * **Parameters:**
   * `name` — The name of the function.
   * `func` — The function to be called when the event is triggered.
 * **Returns:** `h` — object itself.

##### `getFunction(name)`

If the object has a property with the given name, return that property. Otherwise, return null

 * **Parameters:** `name` — The name of the function.
 * **Returns:** `h` — function that is being called.

##### `getEvents()`

Get the events that are currently defined for the chart

 * **Returns:** `h` — events that are being returned are the events that are being passed into the

     constructor.

##### `setNavigator(navigator)`

Set the navigator property of the JavaScript object

 * **Parameters:** `navigator` — The navigator object that is used to navigate to other pages.

##### `getNavigator()`

Get the navigator object from the window object

 * **Returns:** `h` — navigator object.

##### `getWidgets()`

Get the widgets from the page

 * **Returns:** `h` — getWidgets() method returns an array of widgets.

##### `getNavigatorMap()`

Get the navigator object and return a map of the application, module, and view names

 * **Returns:** `h` — navigator map.

##### `setTranslate(translate)`

* Set the translate value of the options object

 * **Parameters:** `translate` — The translation of the slider.

##### `getTranslate(path)`

Get the translation for a given path

 * **Parameters:** `path` — The path to the translation file.
 * **Returns:** `h` — translated path.

##### `setUserPolicies(policies)`

* Set the policies for the user

 * **Parameters:** `policies` — A list of policies to be applied to the user.

##### `checkPolicy(policy)`

Check if the policy is in the list of policies

 * **Parameters:** `policy` — The policy to check.
 * **Returns:** `h` — index of the policy in the list of policies.

##### `getApplication()`

Get the application object from the NavigatorMap

 * **Returns:** `h` — application object.

##### `getModule()`

Get the module name from the navigator map

 * **Returns:** `h` — module that the navigator is in.

##### `getView()`

Get the view from the navigator map

 * **Returns:** `h` — view from the navigator map.

##### `addHTMLElement(html, immediately)`

Add an HTML element to the page

 * **Parameters:**
   * `html` — The HTML element to add to the DOM.
   * `immediately` — If true, the element will be appended to the body immediately. If

     false, the element will be appended to the body after the current script has finished

     executing.
 * **Returns:** `h` — `addHTMLElement` method returns the `HTMLElement` object.

##### `addEventRender(func)`

Add a function to the list of functions that will be called when the event is rendered

 * **Parameters:** `func` — A function that will be called when the event is triggered.
 * **Returns:** `h` — calendar object.

##### `getElements()`

Get all the elements in the DOM that match the selector

 * **Returns:** `h` — elements of the array.

##### `out()`

* For each element in the array of elements, append it to the body of the document. * For each event in the array of events, call it

##### `close(event)`

*This function is called when the user clicks the close button on the widget. It closes all widgets.*

 * **Parameters:** `event` — The event object that was passed to the close() method.

##### `handleEvent(event)`

If the event target has a data-handle-event attribute, then execute the function that is the value of the attribute

 * **Parameters:** `event` — The event object that was passed to the event handler.

##### `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the attribute is searched for in the HTML source code.
 * **Returns:** `h` — closest attribute.

##### `static getUrlParameter(parameter)`

Given a URL, return the value of the specified parameter

 * **Parameters:** `parameter` — The name of the parameter to get.
 * **Returns:** `h` — value of the parameter.

##### `addAttribute(input, handle)`

Adds an event listener to an element.

 * **Parameters:**
   * `input` — The input element to add the event listener to.
   * `handle` — The name of the event to listen for.

<br>

#### ***Class window.Page.Widget usable methods***

It creates a class called Widget for contain organizer class

<br>

#### ***Class window.Page.Widget.Organizer usable methods***

##### `close(event)`

This function is used to close all the child components of the parent component.

 * **Parameters:** `event` — The event object that was passed to the close function.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details