(function(module) {
try {
  module = angular.module('bsDialogue');
} catch (e) {
  module = angular.module('bsDialogue', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dialogue.html',
    '<div class="modal-header" ng-show="vm.title.length">\n' +
    '    <h3 class="modal-title">{{vm.title}}</h3>\n' +
    '</div>\n' +
    '<div class="modal-body">\n' +
    '    <div ng-if="vm.templateUrl" ng-include="vm.templateUrl"></div>\n' +
    '    <p ng-bind-html="vm.text" ng-if="!vm.templateUrl"></p>\n' +
    '    <input type="text" ng-show="vm.prompt" ng-model="vm.userInput"/>\n' +
    '</div>\n' +
    '<div class="modal-footer">\n' +
    '    <button ng-repeat="button in vm.buttons" class="btn" ng-class="[button.css]" ng-click="vm.buttonClicked(button)">\n' +
    '        {{button.text}}\n' +
    '    </button>\n' +
    '</div>');
}]);
})();
