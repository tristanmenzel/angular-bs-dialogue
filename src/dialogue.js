(function () {
    'use strict';

    angular
        .module('bsDialogue', ['ui.bootstrap'])
        .constant('dialogueDefaults', {
            primaryButtonCss: 'btn-primary',
            buttonCss: 'btn-default',
            negativeButtonCss: 'btn-danger'
        })
        .factory('dialogue', DialogueFactory)
        .controller('DialogueController', DialogueController)
        .directive('dialogueTemplate', DialogueTemplate);

    function DialogueController($modalInstance, title, text, buttons, prompt, templateUrl, template, model, $scope) {
        this.title = title;
        this.buttons = buttons;
        this.text = text;
        this.prompt = prompt;
        this.userInput = "";
        this.templateUrl = templateUrl;
        this.template = template;
        $scope.model = model;
        this.buttonClicked = function (button) {
            if (prompt) {
                $modalInstance.close(this.userInput);
            } else {
                $modalInstance.close(button.value);
            }
        };

        this.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    function DialogueTemplate($compile) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var templateHtml = scope.vm.template;
                if (!templateHtml)
                    return;
                element.html(templateHtml);
                $compile(element.contents())(scope);
            }
        };
    }

    function DialogueFactory(dialogueDefaults, $modal, $sce) {


        var modalOptions = {
            templateUrl: 'dialogue.html',
            controller: 'DialogueController as vm',
            backdrop: 'static'
        };


        function Dialogue(options) {
            var mo = angular.copy(modalOptions),
                uo = new Options(options);

            mo.resolve = {
                title: function () {
                    return uo.title;
                },
                templateUrl: function () {
                    return uo.templateUrl;
                },
                text: function () {
                    return $sce.trustAsHtml(uo.text);
                },
                prompt: function () {
                    return uo.prompt;
                },
                buttons: function () {
                    return uo.getButtons();
                },
                template: function () {
                    return uo.template;
                },
                model: function(){
                    return uo.model;
                }
            };
            return $modal.open(mo).result;
        }

        Dialogue.alert = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "alert";
            return this(o);
        };
        Dialogue.confirm = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "confirm";
            return this(o);
        };
        Dialogue.prompt = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "prompt";
            o.prompt = true;
            return this(o);
        };
        Dialogue.custom = function (options) {
            return this(options);
        };

        function Options(userOptions) {
            var o = userOptions || {};

            this.primaryButtonCss = o.primaryButtonCss || dialogueDefaults.primaryButtonCss;
            this.buttonCss = o.buttonCss || dialogueDefaults.buttonCss;
            this.negativeButtonCss = o.negativeButtonCss || dialogueDefaults.negativeButtonCss;

            this.title = o.title || '';
            this.text = o.text || '';
            this.buttons = o.buttons || [];
            this.templateUrl = o.templateUrl;
            this.prompt = o.prompt === true;
            this.template = o.template;
            this.model = o.model;

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

            this.getConfirmButtons = function () {
                return [
                    {
                        text: this.getConfirmAffirmative(),
                        css: this.primaryButtonCss,
                        value: true
                    },
                    {
                        text: this.getConfirmNegative(),
                        css: this.buttonCss,
                        value: false
                    }
                ];
            };
            this.getAlertButtons = function () {
                return [
                    {
                        text: "Ok",
                        css: this.primaryButtonCss
                    }
                ];
            };
            this.getPromptButtons = function () {
                return [
                    {
                        text: "Ok",
                        css: this.primaryButtonCss,
                        value: true
                    }
                ];
            };

            this.getButtons = function () {
                switch (this.buttons) {
                    case "confirm":
                        return this.getConfirmButtons();
                    case "alert":
                        return this.getAlertButtons();
                    case "prompt":
                        return this.getPromptButtons();
                    default:
                        return this.buttons;

                }
            };

        }

        return Dialogue;
    }


})();