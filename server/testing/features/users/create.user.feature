Feature: Create user
	
	As a developer
	I want to create a new user account
	So that I can provide users with new accounts

	Scenario: Creating new user
		Given the user "Bob" doesn't exist
		When the user "Bob" is created
		Then the user "Bob" is added to the Firebase list of users