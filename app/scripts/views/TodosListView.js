maria.SetView.subclass(checklist,'TodosListView',{
  properties:{
    createChildView:function(todoModel){
      return new checklist.TodoView(todoModel);
    }
  }
});
