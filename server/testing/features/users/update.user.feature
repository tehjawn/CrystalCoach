Feature: Update user
	
	As a developer
	I want to update an existing user account
	So that I can edit that user's information

	Scenario: Updating user weight
		Given the user "Bob" exists
		When the user "Bob"'s weight is updated
		Then the user "Bob"'s weight changes in Firebase