Feature: Read user
	
	As a developer
	I want to read an existing user account
	So that I can use that user's information

	Scenario: Reading user weight
		Given the user "Bob" exists
		When the user "Bob"'s weight is read
		Then the user "Bob"'s weight is read from the Firebase