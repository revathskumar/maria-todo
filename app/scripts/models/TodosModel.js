maria.SetModel.subclass(checklist,'TodosModel',{
  properties:{
    getDone:function(){
      return this.filter(function(todo){
        return todo.isDone();
      });
    },
    isAllDone: function(){
      return (this.length > 0) && (this.getDone().length == this.length);
    },
    isAllUndone: function(){
      return this.getDone().length < 1;
    },
    markAllDone: function(){
      this.forEach(function(todo){
        todo.setDone(true);
      });
    },
    markAllUndone: function(){
      this.forEach(function(todo){
        todo.setDone(false);
      });
    },
    deleteDone: function(){
      this['delete'].apply(this,this.getDone());
    },
    toJSON: function(){
      return this.map(function(todo){
        return todo.toJSON();
      });
    }
  }
});

checklist.TodosModel.fromJSON = function(collection){
  if(collection === null){
    return;
  }
  var model = new checklist.TodosModel();
  for(i = 0, l = collection.length; i < l; i++){
    model.add(checklist.TodoModel.fromJSON(collection[i]));
  }
  return model;
};
