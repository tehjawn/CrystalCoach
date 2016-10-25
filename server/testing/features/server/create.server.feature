Feature: Create server
	
	As a developer
	I want to start the CrystalCoach server
	So that I can serve the CrystalCoach web application

	Scenario: Creating server for testing
		When Gulp initializes server for testing
		Then the server is running on port "8023"

	Scenario: Creating server for development
		When Gulp initializes server for development
		Then the server is running on port "8000"

	Scenario: Creating server for production
		When Gulp initializes server for deployment
		Then the server is running on port "80"