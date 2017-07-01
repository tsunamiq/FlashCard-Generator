"use strict";

(function(){
	var fs = require('fs');

	var clozeTest = function(){
			

			this.clozeArray = fs.readFileSync("./cards.txt").toString().split('\n').filter(Boolean);
			
			this.count = 0;
			this.countLength = this.clozeArray.length;
			this.correct = 0;
			this.incorrect = 0; 		
	}

module.exports = clozeTest; 
})()


