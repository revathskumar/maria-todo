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
    }
  }
});
