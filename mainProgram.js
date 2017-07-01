"use strict";
var inquirer = require('inquirer');
var clozeCard = require("./ClozeCard.js");
var storeCard = require("./cardStorage.js");
var clozeTest = require("./clozeTest.js");
var newTest = new clozeTest();



var clozeGen = {
	init: function(){
		inquirer.prompt([{
	   		type: "list",
	   		choices: ["Create a cloze card" , "Run through the Cards", "End Game"],
	   		name: "text",
	   		message: "Would you like to create a card or play the game?"
	 		}]).then(function(answer) {
	  		console.log("choice:" +answer.text)
    		if(answer.text === "Create a cloze card"){
    			clozeGen.collectCloze();
	    	}else if(answer.text === "End Game"){
	    		process.exit();
	    	}else if(answer.text === "Run through the Cards"){
	    		clozeGen.Test();

	    	}
		})
  	},
  	cloze: "",
  	text: "",
  	partialText: "",
	collectCloze: function(){
				
		inquirer.prompt([{
			type: "input",
			name: "text",
			message: "Please type in full text:" 

		}]).then(function(answer){
			clozeGen.text = answer.text;
			clozeGen.collectText();
		})
				
	},
	collectText: function(){
		inquirer.prompt([{
			type: "input",
			name: "text",
			message: "Please type in cloze:" 

			}]).then(function(answer){
				clozeGen.cloze = answer.text;
				clozeGen.clozeConstructor();

			})

	},
	clozeConstructor: function(){
		var newClozeCard = new clozeCard(clozeGen.text, clozeGen.cloze);
	

		if(newClozeCard.partialText()){
			clozeGen.partialText = newClozeCard.partialText();
			console.log("\n===============================================")
			console.log("===============================================\n")
			console.log("Congratulation! You created a new Cloze Card! ")
			console.log("Full Text: " + clozeGen.text);
			console.log("Cloze Text: " + clozeGen.cloze);
			console.log("Partial Text: " + clozeGen.partialText);
			console.log("\n===============================================")
			console.log("===============================================\n")
			console.log("")

			var newCardStorage = new storeCard(clozeGen.cloze, clozeGen.partialText);
			

			newCardStorage.storeData();	
			
			clozeGen.init();
		}else{
			
			console.log("===========================================")
			console.log("Incorrect Cloze text! Please Try again!");
			console.log("===========================================")
			console.log("")
			clozeGen.init();
		}
	},
	Test: function(){
	
		console.log("\n===========================================")
		console.log("	    Guess the Card!")
		console.log("===========================================\n")
		
	
		var card = JSON.parse(newTest.clozeArray[newTest.count]);
					inquirer.prompt([{
						type: "input",
						name: "text",
						message: card.front

					}]).then(function(answer){
						if(answer.text === card.back){
							console.log("\n===========================================")
							console.log("	  CORRECT!");
							console.log("\n===========================================")
							newTest.correct++; 
							newTest.count++;
						}else{
							

							console.log("\n===========================================")
							console.log("	  INCORRECT!");
							console.log("\n===========================================")

							newTest.incorrect++;
							newTest.count++;
						} 
						if(newTest.count < newTest.countLength){
							console.log("countLength: " + newTest.countLength)
							console.log("count: " + newTest.count)
					
							clozeGen.Test();
							
						}else{
							console.log("===========================================")
							console.log("===========================================")
							
							console.log("END OF CARDS")
							console.log("SCORE||  Correct: " + newTest.correct + " and Incorrect: " + newTest.incorrect);
							console.log("===========================================")
							console.log("===========================================")
							clozeGen.init();
							newTest.count = 0;
							newTest.correct = 0;
							newTest.incorrect = 0; 


						}
					});
	}
		
}

clozeGen.init(); 

