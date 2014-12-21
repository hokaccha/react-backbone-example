(function()  {

'use strict';

var Todo = React.createClass({displayName: "Todo",
  getInitialState:function() {
    return { todos: this.props.initialTodos };
  },

  componentDidMount:function() {
    this.props.initialTodos.on('add remove change', this._onChange);
  },

  componentWillUnmount:function() {
    this.props.initialTodos.off('add remove change');
  },

  render:function() {
    return (
      React.createElement("div", null, 
        React.createElement(TodoForm, {todos: this.state.todos}), 
        React.createElement(TodoList, {todos: this.state.todos})
      )
    );
  },

  _onChange:function() {
    this.setState({ todos: this.state.todos });
  },
});

var TodoForm = React.createClass({displayName: "TodoForm",
  onSubmit:function(e) {
    e.preventDefault();

    var textElement = this.refs.text.getDOMNode();
    var label = textElement.value.trim();
    if (!label) return;

    this.props.todos.create({ label:label });
    textElement.value = '';
  },

  render:function() {
    return (
      React.createElement("form", {onSubmit: this.onSubmit}, 
        React.createElement("input", {ref: "text", type: "text"})
      )
    );
  }
});

var TodoList = React.createClass({displayName: "TodoList",
  render:function() {
    return (
      React.createElement("ul", null, 
        this.props.todos.map(function(todo)  {
          return React.createElement(TodoListItem, {key: todo.cid, todo: todo});
        })
      )
    );
  }
});

var TodoListItem = React.createClass({displayName: "TodoListItem",
  completeClassName:function() {
    return this.props.todo.get('complete') ? 'complete' : 'yet';
  },

  onChangeComplete:function() {
    var checkbox = this.refs.complete.getDOMNode();
    this.props.todo.save('complete', checkbox.checked);
  },

  onClickRemove:function() {
    if (window.confirm('消すよ？')) {
      this.props.todo.destroy();
    }
  },

  render:function() {
    var todo = this.props.todo;

    return (
      React.createElement("li", {className: this.completeClassName()}, 
        React.createElement("input", {type: "checkbox", 
               ref: "complete", 
               onChange: this.onChangeComplete, 
               defaultChecked: this.props.todo.get('complete')}), 
        React.createElement("span", {className: "label"}, todo.get('label')), 
        React.createElement("span", {className: "removeBtn", onClick: this.onClickRemove}, "✖")
      )
    );
  }
});

window.View = { Todo:Todo };

}.bind(this))();

/* vim: set ft=javascript.jsx : */
