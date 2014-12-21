(function()  {

'use strict';

var todos = new Model.TodoCollection();

React.render(
  React.createElement(View.Todo, { initialTodos: todos }),
  document.getElementById('workspace')
);

todos.fetch();

})();
