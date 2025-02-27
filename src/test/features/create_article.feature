Feature: Create an article

  @e2e
  Scenario: User creates an article
    Given the user providing valid url for login and valid email "test2@email.com" and password "Tester1225"
    When the user fills in the article details with title "My First Article", description "This is an amazing article", body "This is the content of the article"
    # Then the article should appear in the global feed
