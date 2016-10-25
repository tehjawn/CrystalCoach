Feature: Delete user
	
	As a developer
	I want to delete an existing user account
	So that I can allow users to terminate their account

	Scenario: Deleting a user
		Given the user "Bob" exists
		When the user "Bob" is deleted
		Then the user "Bob" is removed from the Firebase list of users