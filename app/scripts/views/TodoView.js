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
