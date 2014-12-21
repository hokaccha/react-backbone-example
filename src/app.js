(() => {

'use strict';

var todos = new Model.TodoCollection([
  { label: 'hoge', complete: false },
  { label: 'fuga', complete: true },
  { label: 'bar',  complete: false },
]);

React.render(
  React.createElement(View.Todo, { initialTodos: todos }),
  document.getElementById('workspace')
);

})();
