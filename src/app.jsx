/*jshint esnext:true*/

var Todo = React.createClass({
  getInitialState() {
    return {
      lastId: 3,
      items: [
        { id: 1, label: 'hoge', complete: false },
        { id: 2, label: 'fuga', complete: true },
        { id: 3, label: 'bar',  complete: false },
      ]
    };
  },

  changeComplete(item, completed) {
    var items = this.state.items.map((_item) => {
      if (item === _item) {
        item.complete = completed;
      }

      return _item;
    });

    this.setState({ items });
  },

  addTodo(text) {
    var lastId = this.state.lastId + 1;
    var items = this.state.items.concat({
      id: lastId,
      label: text,
      complete: false
    });

    this.setState({ lastId, items });
  },

  removeTodo(item) {
    var items = this.state.items.filter((_item) => item !== _item);

    this.setState({ items });
  },

  render() {
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        <TodoList items={this.state.items}
                  onChangeComplete={this.changeComplete}
                  onRemoveItem={this.removeTodo} />
      </div>
    );
  }
});

var TodoForm = React.createClass({
  onSubmit(e) {
    e.preventDefault();

    var textElement = this.refs.text.getDOMNode();
    var value = textElement.value.trim();
    if (!value) return;

    this.props.onSubmit(value);
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
        {this.props.items.map((item) => {
          return <TodoListItem
            key={item.id}
            item={item}
            onChangeComplete={this.props.onChangeComplete}
            onRemoveItem={this.props.onRemoveItem}
          />;
        })}
      </ul>
    );
  }
});

var TodoListItem = React.createClass({
  completeClassName() {
    return this.props.item.complete ? 'complete' : 'yet';
  },

  onChangeComplete() {
    var checkbox = this.refs.complete.getDOMNode();
    this.props.onChangeComplete(this.props.item, checkbox.checked);
  },

  onClickRemove() {
    if (window.confirm('消すよ？')) {
      this.props.onRemoveItem(this.props.item);
    }
  },

  render() {
    var item = this.props.item;

    return (
      <li className={this.completeClassName()}>
        <input type="checkbox"
               ref="complete"
               onChange={this.onChangeComplete}
               defaultChecked={this.props.item.complete} />
        <span className="label">{item.label}</span>
        <span className="removeBtn" onClick={this.onClickRemove}>✖</span>
      </li>
    );
  }
});

React.render(<Todo />, document.getElementById('workspace'));
