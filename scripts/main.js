var checklist = {}

maria.Model.subclass(checklist, 'TodoModel',{
  properties:{
    _isDone: false,
    _content: '',
    getContent: function(){
      return this._content;
    },
    setContent: function(content){
      this._content = content;
      this.dispatchEvent({type:'change'});
    },
    isDone: function(){
      return this._isDone;
    },
    setDone: function(isDone){
      this._isDone = isDone;
      this.dispatchEvent({type:'change'});
    },
    toggleDone:function(){
      this.setDone(!this.isDone());
    },
    toJSON: function(){
      return {
        content: this.getContent(),
        done: this.isDone()
      };
    }
  }
});

checklist.TodoModel.fromJSON = function(todo){
  var model = new checklist.TodoModel();
  model.setContent(todo.content);
  model.setDone(todo.done);
  return model;
};

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

checklist.TodoTemplate =
  '<li class="Todo">' +
      '<span class="checkbox"></span> ' +
      '<span class="content"></span>' +
  '</li>';

checklist.TodosListTemplate =
  '<ul class="TodosList"></ul>';

checklist.TodoInputTemplate =
  '<div><input name="todo"/><button name="add">Add</button></div>';

maria.ElementView.subclass(checklist,'TodoView',{
  uiActions:{
    "click .checkbox":"onClickCheckbox"
  },
  properties: {
    buildData: function(){
      var model = this.getModel();
      $(this.find('.content')).html(model.getContent());
      if(model.isDone()){
        $(this.find('.Todo')).addClass('TodoDone');
      }
      else{
        $(this.find('.Todo')).removeClass('TodoDone');
      }
    },
    update: function(){
      this.buildData();
    }
  }
});

maria.SetView.subclass(checklist,'TodosListView',{
  properties:{
    createChildView:function(todoModel){
      return new checklist.TodoView(todoModel);
    }
  }
});

maria.ElementView.subclass(checklist,'TodoInputView',{
  uiActions:{
    "click button": "addNewTodo"
  },
  properties:{
    getInputValue: function(){
      return this.find("input").value;
    },
    clearInput:function(){
      this.find("input").value = "";
    }
  }
});

maria.Controller.subclass(checklist,'TodoController',{
  properties: {
    onClickCheckbox: function(){
      this.getModel().toggleDone();
    }
  }
});

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
