(function(){
  var todoModel = new checklist.TodoModel();
  todoModel.setContent("Hello world!!");

  var view = new checklist.TodoView(todoModel);
  $('body').append(view.build());
})();
