Feature: Create server
	
	As a developer
	I want to start the CrystalCoach server
	So that I can serve the CrystalCoach web application

	Scenario: Creating server for testing
		When "gulp serve:test" is run
		Then the server is running on port "8023"

	Scenario: Creating server for development
		When "gulp serve:dev" is run
		Then the server is running on port "8000"

	@watch
	Scenario: Creating server for production
		When "gulp deploy" is run
		Then the server is running on port "80"