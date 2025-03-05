@JS-1042
Feature: login page validation

  @regression
  Scenario: login page with valid username and password
    Given providing valid url for login
    When providing valid email and password
    Then clicking login button

  @smoke @TEST_JS-1001
  Scenario: login page with valid username and password
    Given providing valid url for login
    When providing valid email as "test2@email.com" and password as "Tester1225"
    Then clicking login button
 