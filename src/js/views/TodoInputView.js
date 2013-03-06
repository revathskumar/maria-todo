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
