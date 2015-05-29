(function(module) {
try {
  module = angular.module('bsDialogue');
} catch (e) {
  module = angular.module('bsDialogue', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dialogue.html',
    '<div class="modal-header" ng-show="title.length">\n' +
    '    <h3 class="modal-title">{{title}}</h3>\n' +
    '</div>\n' +
    '<div class="modal-body">\n' +
    '    <p ng-bind-html="text"></p>\n' +
    '    <input type="text" ng-show="prompt" ng-model="userInput"/>\n' +
    '</div>\n' +
    '<div class="modal-footer">\n' +
    '    <button ng-repeat="button in buttons" class="btn" ng-class="[button.css]" ng-click="buttonClicked(button)">{{button.text}}</button>\n' +
    '</div>');
}]);
})();
