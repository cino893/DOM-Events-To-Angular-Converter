# DOM-Events-To-Angular-Converter
Angular module that converts DOM events to use it in Angular.JS way

## So this is:

Another simple module that converts events we want to angularJS directive of attribute type.
It works same as common angularJS event handlers.
So basically it converts event to attribute with `-converted-event` prefix eg. 'focusout' to attribute 'focusout-converted-event'

# Samples of use

At first configure events that you want to use:

```
angular.module('myApp',['domEventsToAngularConverter'])
.config(['domEventsToConvertProvider', function(domEventsToConvertProvider) {
        domEventsToConvertProvider.$get().push(['focusout','ondrop']);
}]);
```
or
```
angular.module('myApp',['domEventsToAngularConverter'])
.run(['domEventsToConvert', function(domEventsToConvert){
  domEventsToConvert.push(['focusout','ondrop']);
}])
```

Then just use it like
```
<input focusout-converted-event="myFunction($event, 'yourOptionalParams')"/>
```

**Remeber to execute this script after angular and before your main module! :)**

