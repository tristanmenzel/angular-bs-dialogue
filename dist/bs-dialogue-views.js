(function(module) {
try {
  module = angular.module('bsDialogue');
} catch (e) {
  module = angular.module('bsDialogue', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('dialogue.html',
    '<div class="modal-header" ng-show="vm.title.length"><h3 class="modal-title">{{vm.title}}</h3></div><div class="modal-body"><div dialogue-template=""></div><div ng-if="vm.templateUrl" ng-include="vm.templateUrl"></div><p ng-bind-html="vm.text" ng-if="!vm.templateUrl"></p><input type="text" ng-show="vm.prompt" ng-model="vm.userInput"></div><div class="modal-footer"><button ng-repeat="button in vm.buttons" class="btn" ng-class="[button.css]" ng-click="vm.buttonClicked(button)">{{button.text}}</button></div>');
}]);
})();
