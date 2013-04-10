jQuery(function($){

  var store = localStorage.getItem('maria-todo');
  var todoList = store ? checklist.TodosModel.fromJSON(JSON.parse(store)) :
    new checklist.TodosModel();

  maria.on(todoList,'change',function(){
    localStorage.setItem('maria-todo',JSON.stringify(todoList.toJSON()));
  });

  var view = new checklist.TodosListView(todoList);
  var inputView = new checklist.TodoInputView(todoList);
  $('body').append(inputView.build());
  $('body').append(view.build());
});
