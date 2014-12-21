var Todo = React.createClass({displayName: "Todo",
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
      React.createElement("div", null, 
        React.createElement(TodoForm, {onSubmit: this.addTodo}), 
        React.createElement(TodoList, {items: this.state.items, 
                  onChangeComplete: this.changeComplete, 
                  onRemoveItem: this.removeTodo})
      )
    );
  }
});

var TodoForm = React.createClass({displayName: "TodoForm",
  onSubmit: function(e) {
    e.preventDefault();
    var textElement = this.refs.text.getDOMNode();
    var value = textElement.value.trim();
    if (!value) return;

    this.props.onSubmit(value);
    textElement.value = '';
  },

  render: function() {
    return React.createElement("form", {onSubmit: this.onSubmit}, React.createElement("input", {ref: "text", type: "text"}));
  }
});

var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    return (
      React.createElement("ul", null, 
        this.props.items.map(function(item) {
          return React.createElement(TodoListItem, {
            key: item.id, 
            item: item, 
            onChangeComplete: this.props.onChangeComplete, 
            onRemoveItem: this.props.onRemoveItem}
          );
        }.bind(this))
      )
    );
  }
});

var TodoListItem = React.createClass({displayName: "TodoListItem",
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
      React.createElement("li", {className: this.completeClassName()}, 
        React.createElement("input", {type: "checkbox", 
               ref: "complete", 
               onChange: this.onChangeComplete, 
               defaultChecked: this.props.item.complete}), 
        React.createElement("span", {className: "label"}, item.label), 

        React.createElement("span", {className: "removeBtn", onClick: this.onClickRemove}, "✖")
      )
    );
  }
});

React.render(React.createElement(Todo, null), document.getElementById('workspace'));
