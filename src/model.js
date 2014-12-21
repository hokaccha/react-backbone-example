(() => {

'use strict';

var TodoModel = Backbone.Model.extend({
  defaults: {
    label: '',
    complete: false,
  }
});

var TodoCollection = Backbone.Collection.extend({
  model: TodoModel
});

window.Model = { TodoModel, TodoCollection };

})();
