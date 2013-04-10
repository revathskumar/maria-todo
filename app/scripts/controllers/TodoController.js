maria.Controller.subclass(checklist,'TodoController',{
  properties: {
    onClickCheckbox: function(){
      this.getModel().toggleDone();
    }
  }
});
