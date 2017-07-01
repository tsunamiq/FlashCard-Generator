"use strict";

(function(){

var ClozeCard = function( text, cloze){
	this.text = text.trim().toLowerCase();
	this.cloze = cloze.trim().toLowerCase();
	this.partialText = function(){
		if(this.text.search(this.cloze)>=0){
			// console.log("search: " + this.text.search(this.cloze))
			return this.text.replace(this.cloze,"...");
		}else{
			return false
		
		}
	}

	
}



module.exports = ClozeCard; 

})();


