let sentenceBuilder={
    subject: "I",
    verb: "am",
    object: "coding",
    buildsentence : function(){
      return (this.subject && this.verb && this.object)?`${this.subject} ${this.verb} ${this.object}`:"Incomplete sentence"
      
    },
    updateProperty:function(property, value){
      return (this.hasOwnProperty(property))? this[property]=value:"Invalid property"
      
    }
    
  }
  console.log(sentenceBuilder.buildsentence())
  console.log(sentenceBuilder.updateProperty("object","cooking"))
  
  
  
  
  
  
  
  
  
  
 