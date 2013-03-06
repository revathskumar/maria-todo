(function(){
  var todoList = new checklist.TodosModel();

  var todoModel = new checklist.TodoModel();
  todoModel.setContent("Hello world!!");
  todoList.add(todoModel);

  var todo2 = new checklist.TodoModel();
  todo2.setContent("World Hello!!");

  var todo3 = new checklist.TodoModel();
  todo3.setContent("Add another!!");

  todoList.add(todo2, todo3);


  var view = new checklist.TodosListView(todoList);
  var inputView = new checklist.TodoInputView(todoList);
  $('body').append(inputView.build());
  $('body').append(view.build());
})();
