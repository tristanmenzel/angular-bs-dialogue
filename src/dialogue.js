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
    function Dialogue(dialogueDefaults, $modal, $sce) {
        var modalOptions = {
            templateUrl: 'dialogue.html',
            controller: 'dialogueCtrl as vm'
        };
        this.alert = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "alert";
            return this.custom(o);
        };
        this.confirm = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "confirm";
            return this.custom(o);
        };
        this.prompt = function (text, options) {
            var o = options || {};
            o.text = text;
            o.buttons = "prompt";
            o.prompt = true;
            return this.custom(o);
        };
        this.custom = function (options) {
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
            this.text = o.text || '';
            this.buttons = o.buttons || [];
            this.templateUrl = o.templateUrl;
            this.prompt = o.prompt === true;

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

            this.getButtons = function(){
                switch(this.buttons){
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
    }

    function DialogueController($scope, $modalInstance, title, text, buttons, prompt, templateUrl) {
        this.title = title;
        this.buttons = buttons;
        this.text = text;
        this.prompt = prompt;
        this.userInput = "";
        this.templateUrl = templateUrl;
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
})();