Feature: User Authentication

  @apitest
  Scenario: User logs in via the API and the access token is saved in the authentication file
    Given the user provides valid API credentials with email "test2@email.com" and password "Tester1225"
    When the user sends a login request to the authentication API
    Then the user should receive a valid access token
    And the access token should be saved in the authentication file
