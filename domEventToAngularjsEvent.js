(function() {
  'use strict'
  var converterCompileProviderReference = null;
  angular.module('domEventsToAngularConverter', [])
    .config(['$compileProvider', function($compileProvider) {
      converterCompileProviderReference = $compileProvider;
    }])
    .provider('domEventsToConvert', function($injector) {
      var _values = [];
      return {
        $get: function() {
          return {
            push: function(params) {
              if(typeof (params) === 'string')
                params = [params];
              else if(!angular.isArray(params))
                throw new Error('domEventsToConvertProvider: Give a proper name of event in string or array of strings!');
              angular.forEach(params, function(param) {
                _values.push(param);
              });
              bootstrapDirectives(_values, converterCompileProviderReference);
            }
          }
        }
      }
      function bootstrapDirectives(namesContainer, compileProvider) {
        namesContainer.forEach(function(eventName) {
          var directiveName = eventName + 'ConvertedEvent';
          compileProvider.directive(directiveName, ['$parse', '$rootScope', function($parse, $rootScope) {
            return {
              restrict: 'A',
              compile: compileFunction
            };
            function compileFunction($element, attr) {
              var fn = $parse(attr[directiveName]);
              return function EventHandler(scope, element) {
                element.on(eventName, function(event) {
                  var callback = function() {
                    fn(scope, {$event: event});
                  };
                  if($rootScope.$$phase) {
                    scope.$evalAsync(callback);
                  } else {
                    scope.$apply(callback);
                  }
                });
              };
            }
          }])
        });
      }
    })
})();