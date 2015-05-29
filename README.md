# angular-bs-dialogue
An angular service which simplifies showing and hiding simple bootstrap modals. Inspired by Bootbox

##Install
`bower install angular-bs-dialogue`

##Dependencies
 - [Bootstrap CSS](http://getbootstrap.com/getting-started/#download) (Don't need jquery)
 - [UI Boostrap](https://angular-ui.github.io/bootstrap/) (Only need modal)

##Usage

**Include Js**

```html
<script src="/bower_compontents/angular-bs-dialogue/dist/bs-dialogue.min.js"></script>
```

 **Add module dependency**

```javascript
angular.module('app', ['bsDialogue'])`
```

**Take a dependency on dialogue service**

```javascript
angular.controller('DemoCtrl', function(dialogue){
  var vm = this;
};
```

**Alert**

```javascript
vm.alert = function () {
    dialogue.alert('This is an alert').finally(function(){
        console.log('Alert dismissed');
    });
};
```
**Alert with title**

```javascript
vm.alert = function () {
    dialogue.alert('This is an alert', {title: 'Alert title'}).finally(function(){
        console.log('Alert dismissed');
    });
};
```


**Confirm**

Default buttons _okCancel_
```javascript
vm.confirm = function () {
    dialogue.confirm('Are you sure you want to do this?').then(function (response) {
        dialogue.alert('Your response was ' + response);
    }, function () {
        dialogue.alert('You dismissed the dialogue');
    });
};
```
_yesNo_ buttons
```javascript
vm.confirm = function () {
    dialogue.confirm('Are you sure you want to do this?', {confirmMode: 'yesNo'}).then(function (response) {
        dialogue.alert('Your response was ' + response);
    }, function () {
        dialogue.alert('You dismissed the dialogue');
    });
};
```

**Prompt**
```javascript
vm.prompt = function () {
    dialogue.prompt("What is your name?").then(function (response) {
        dialogue.alert("Hello " + response);
    }, function () {
        dialogue.alert('You dismissed the dialogue');
    });
};
```
**Custom**
```javascript
vm.custom = function(){
  dialogue.custom({
      text: 'Custom <b>TEXT</b> <a href="//www.google.com">Google</a>',
      buttons: [{
          text: 'Good',
          css: 'btn-success',
          value: 'good'
      },{
          text: 'Bad',
          css: 'btn-danger',
          value: 'bad'
      },{
          text: 'Ok',
          css: 'btn-warning',
          value: 'ok'
      }],
      title: 'Big title !'
  }).then(function (response) {
      dialogue.alert('Your response was ' + response);
  }, function () {
      dialogue.alert('You dismissed the dialogue');
  });
};
```
##Change default button classes
```javascript
angular.module('app').config(function(dialogueDefaults){
  dialogueDefaults.primaryButtonCss = 'btn-primary';
  dialogueDefaults.buttonCss = 'btn-default';
  dialogueDefaults.negativeButtonCss = 'btn-danger';
});
```
