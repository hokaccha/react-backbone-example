var Todo = React.createClass({
  getInitialState: function() {
    return {
      lastId: 3,
      items: [
        {id: 1, label: 'hoge', complete: false},
        {id: 2, label: 'fuga', complete: true},
        {id: 3, label: 'bar',  complete: false},
      ]
    };
  },

  changeComplete: function(item, completed) {
    var items = this.state.items.map(function(_item) {
      if (item === _item) {
        item.complete = completed;
      }

      return _item;
    });

    this.setState({ items: items });
  },

  addTodo: function(text) {
    var id = this.state.lastId + 1;

    var todo = {
      id: id,
      label: text,
      complete: false
    };

    this.setState({
      lastId: id,
      items: this.state.items.concat(todo)
    });
  },

  removeTodo: function(item) {
    var items = this.state.items.filter(function(_item) {
      return item !== _item;
    });

    this.setState({ items: items });
  },

  render: function() {
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
  onSubmit: function(e) {
    e.preventDefault();
    var textElement = this.refs.text.getDOMNode();
    var value = textElement.value.trim();
    if (!value) return;

    this.props.onSubmit(value);
    textElement.value = '';
  },

  render: function() {
    return <form onSubmit={this.onSubmit}><input ref="text" type="text" /></form>;
  }
});

var TodoList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.items.map(function(item) {
          return <TodoListItem
            key={item.id}
            item={item}
            onChangeComplete={this.props.onChangeComplete}
            onRemoveItem={this.props.onRemoveItem}
          />;
        }.bind(this))}
      </ul>
    );
  }
});

var TodoListItem = React.createClass({
  completeClassName: function() {
    return this.props.item.complete ? 'complete' : 'yet';
  },

  onChangeComplete: function() {
    var checkbox = this.refs.complete.getDOMNode();
    this.props.onChangeComplete(this.props.item, checkbox.checked);
  },

  onClickRemove: function() {
    if (window.confirm('消すよ？')) {
      this.props.onRemoveItem(this.props.item);
    }
  },

  render: function() {
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
