var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

var lastId = 3;
var todos = [
  { id: 1, label: 'hoge', complete: false },
  { id: 2, label: 'fuga', complete: true },
  { id: 3, label: 'bar',  complete: false },
];

app.get('/todos', function(req, res) {
  res.send(todos);
});

app.post('/todos', function(req, res) {
  var todo = {
    id: ++lastId,
    label: req.body.label,
    complete: false
  };

  todos.push(todo);

  res.json(todo);
});

app.put('/todos/:id', function(req, res) {
  var todo = todos.filter(function(item) {
    return item.id === +req.params.id;
  })[0];

  todo.complete = req.body.complete;

  res.json(todo);
});

app.delete('/todos/:id', function(req, res) {
  todos.some(function(item, i) {
    if (item.id === +req.params.id) {
      todos.splice(i, 1);
    }
  });

  res.send(200);
});

app.listen(3030, function() {
  console.log('started: http://localhost:' + this.address().port + '/');
});
