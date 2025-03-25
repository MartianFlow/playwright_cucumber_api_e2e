@JS-1200
Feature: Login API

  @peoplematic @ApisRegression @TEST_JS-1198
  Scenario: Successful login with valid credentials
    Given I send a login request
    Then the response status should be 200
    And the response should contain a token