Feature: login with scenario outlines

  @smoke
  Scenario Outline: valid with two different users
    Given providing valid url for login
    When providing valid email as "<email>" and password as "<password>"
    Then clicking login button

    Examples:
      | email           | password   |
      | test@email.com  | Tester12   |
      | test2@email.com | Tester1225 |