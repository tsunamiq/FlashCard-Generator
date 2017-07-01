"use strict";


(function(){
	var fs = require('fs');
	var storage = function ( cloze, partial){
		this.cardJSON = {
			front: partial,
			back: cloze
		};
		this.storeData = function(){

			console.log(this.cardJSON)
			fs.appendFile('cards.txt',JSON.stringify(this.cardJSON)+"\n", function (err) {
	 			if (err) throw err;
	 
			});
		}

	}

module.exports = storage; 
})();


