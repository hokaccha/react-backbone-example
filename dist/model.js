(function()  {

'use strict';

var TodoModel = Backbone.Model.extend({
  defaults: {
    label: '',
    complete: false,
  }
});

var TodoCollection = Backbone.Collection.extend({
  model: TodoModel,
  url: '/todos',
});

window.Model = { TodoModel:TodoModel, TodoCollection:TodoCollection };

})();
