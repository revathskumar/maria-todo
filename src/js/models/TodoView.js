maria.ElementView.subclass(checklist,'TodoView',{
  uiActions:{
    "click .checkbox":"onClickCheckbox"
  },
  properties: {
    buildData: function(){
      var model = this.getModel();
      console.log(model.isDone());
      $(this.find('.content')).html(model.getContent());
      if(model.isDone()){
        $(this.find('.Todo')).addClass('TodoDone').removeClass('Todo');
      }
      else{
        $(this.find('.Todo')).addClass('Todo').removeClass('TodoDone');
      }
    },
    update: function(){
      this.buildData();
    }
  }
});
