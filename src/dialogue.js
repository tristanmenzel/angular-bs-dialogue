(function () {
    'use strict';

    angular
        .module('bsDialogue', [])
        .service('dialogue', Dialogue)
        .constant('dialogueDefaults', {
            primaryButtonCss: 'btn-primary',
            buttonCss: 'btn-default',
            negativeButtonCss: 'btn-danger'
        })
        .controller("dialogueCtrl", DialogueController);
    function Dialogue(dialogueDefaults, $modal,$sce) {
        var modalOptions = {
            templateUrl: 'dialogue.html',
            controller: 'dialogueCtrl'
        };
        this.alert = function (text, options) {
            var mo = angular.copy(modalOptions),
                uo = new Options(options);

            mo.resolve = {
                title: function () {
                    return uo.title;
                },
                text: function () {
                    return $sce.trustAsHtml(text);
                },
                prompt: function () {
                    return false;
                },
                buttons: function () {
                    return [
                        {
                            text: "Ok",
                            css: uo.primaryButtonCss
                        }
                    ];
                }
            };
            return $modal.open(mo).result;

        };
        this.confirm = function (text, options) {
            var mo = angular.copy(modalOptions),
                uo = new Options(options);

            mo.resolve = {
                title: function () {
                    return uo.title;
                },
                text: function () {
                    return $sce.trustAsHtml(text);
                },
                prompt: function () {
                    return false;
                },
                buttons: function () {
                    return [
                        {
                            text: uo.getConfirmAffirmative(),
                            css: uo.primaryButtonCss,
                            value: true
                        },
                        {
                            text: uo.getConfirmNegative(),
                            css: uo.buttonCss,
                            value: false
                        }
                    ];
                }
            };
            return $modal.open(mo).result;
        };
        this.prompt = function (text, options) {
            var mo = angular.copy(modalOptions),
                uo = new Options(options);

            mo.resolve = {
                title: function () {
                    return uo.title;
                },
                text: function () {
                    return $sce.trustAsHtml(text);
                },
                prompt: function () {
                    return true;
                },
                buttons: function () {
                    return [
                        {
                            text: "Ok",
                            css: uo.primaryButtonCss,
                            value: true
                        }
                    ];
                }
            };
            return $modal.open(mo).result;
        };
        this.custom = function (options) {
            var mo = angular.copy(modalOptions),
                uo = new Options(options);

            mo.resolve = {
                title: function () {
                    return uo.title;
                },
                text: function () {
                    return $sce.trustAsHtml(uo.text);
                },
                prompt: function () {
                    return false;
                },
                buttons: function () {
                    return uo.buttons;
                }
            };
            return $modal.open(mo).result;
        };

        function Options(userOptions) {
            var o = userOptions || {};

            this.primaryButtonCss = o.primaryButtonCss || dialogueDefaults.primaryButtonCss;
            this.buttonCss = o.buttonCss || dialogueDefaults.buttonCss;
            this.negativeButtonCss = o.negativeButtonCss || dialogueDefaults.negativeButtonCss;

            this.title = o.title || '';
            this.text = o.text ||'';
            this.buttons = o.buttons || [];

            this.confirmMode = o.confirmMode || "okCancel";

            this.getConfirmAffirmative = function () {
                switch (this.confirmMode) {
                    case "yesNo":
                        return "Yes";
                    default:
                        return "Ok";
                }
            };

            this.getConfirmNegative = function () {
                switch (this.confirmMode) {
                    case "yesNo":
                        return "No";
                    default:
                        return "Cancel";
                }
            };
        }
    }

    function DialogueController($scope, $modalInstance, title, text, buttons, prompt) {
        $scope.title = title;
        $scope.buttons = buttons;
        $scope.text = text;
        $scope.prompt = prompt;
        $scope.userInput = "";
        $scope.buttonClicked = function (button) {
            if (prompt) {
                $modalInstance.close($scope.userInput);
            } else {
                $modalInstance.close(button.value);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();