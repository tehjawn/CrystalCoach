Feature: Crystal Natural Language Processing
	
	As a user
	I want Crystal to understand what I say
	So that I can perform an action through natural language

	Scenario Outline: Talk with Crystal
		When the user tells Crystal <input>
		Then Crystal understands it as <output>
	  
	  Examples:
	    | 	input									| 	output 										|
	    |		"Hello" 							|		"Good day!"								|
	    |		"I did 50 pushups" 		|		"Good day!"								|
	    |		"I ate chicken" 			|		"Good day!"								|