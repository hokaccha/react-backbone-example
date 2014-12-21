(() => {

'use strict';

var Todo = React.createClass({
  getInitialState() {
    return { todos: this.props.initialTodos };
  },

  componentDidMount() {
    this.props.initialTodos.on('add remove change', this._onChange);
  },

  componentWillUnmount() {
    this.props.initialTodos.off('add remove change');
  },

  render() {
    return (
      <div>
        <TodoForm todos={this.state.todos} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  },

  _onChange() {
    this.setState({ todos: this.state.todos });
  },
});

var TodoForm = React.createClass({
  onSubmit(e) {
    e.preventDefault();

    var textElement = this.refs.text.getDOMNode();
    var label = textElement.value.trim();
    if (!label) return;

    this.props.todos.create({ label });
    textElement.value = '';
  },

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref="text" type="text" />
      </form>
    );
  }
});

var TodoList = React.createClass({
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => {
          return <TodoListItem key={todo.cid} todo={todo} />;
        })}
      </ul>
    );
  }
});

var TodoListItem = React.createClass({
  completeClassName() {
    return this.props.todo.get('complete') ? 'complete' : 'yet';
  },

  onChangeComplete() {
    var checkbox = this.refs.complete.getDOMNode();
    this.props.todo.save('complete', checkbox.checked);
  },

  onClickRemove() {
    if (window.confirm('消すよ？')) {
      this.props.todo.destroy();
    }
  },

  render() {
    var todo = this.props.todo;

    return (
      <li className={this.completeClassName()}>
        <input type="checkbox"
               ref="complete"
               onChange={this.onChangeComplete}
               defaultChecked={this.props.todo.get('complete')} />
        <span className="label">{todo.get('label')}</span>
        <span className="removeBtn" onClick={this.onClickRemove}>✖</span>
      </li>
    );
  }
});

window.View = { Todo };

})();

/* vim: set ft=javascript.jsx : */
