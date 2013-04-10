maria.Controller.subclass(checklist,'TodoInputController',{
  properties:{
    addNewTodo:function(){
      var todo = new checklist.TodoModel();
      todo.setContent(this.getView().getInputValue());

      this.getModel().add(todo);
      this.getView().clearInput();
    }
  }
});
