| No  | Endpoint | Test                                                                                 |
| --- | -------- | ------------------------------------------------------------------------------------ |
| 1   | PUT      | Put order with valid data should receive code 200                                    |
| 2   | PUT      | Put order with invalid data should receive code 400                                  |
| 3   | DELETE   | Delete order by providing valid data should receive code 204                         |
| 4   | DELETE   | Delete order by providing invalid id should receive code 400                         |
| 5   | GET      | Authenticate a user by providing valid username and password should receive code 200 |
| 6   | GET      | Authenticate a user by providing just username should receive code 500               |

Homework 10 - Risk score of application

| No  | Endpoint | Test                                                                                            |
| --- | -------- | ----------------------------------------------------------------------------------------------- |
| 1   | POST     | Calculate risk score with valid date for Low Risk level - positive decision - receive code 200  |
| 2   | POST     | Calculate risk score with valid date for Medium risk level- positive decision- receive code 200 |
| 3   | POST     | Calculate risk score with valid date for High risk - positive decision - receive code 200       |
| 4   | POST     | Calculate risk score with data for negative decision - receive code 200                         |
| 5   | POST     | Calculate risk score with invalid data (no incomes) - receive code 400                          |
| 6   | POST     | Calculate risk score with invalid data (debt < 0) - receive code 400                            |

Classwork + homework11 for auth-flow.spec.ts

| No  | Endpoint | Test                                                                        |
| --- | -------- | --------------------------------------------------------------------------- |
| 1   | POST     | Incorrect username and password return 401                                  |
| 2   | POST     | Successful authorization flow with correct username and password return 200 |
| 3   | POST     | Successful authorization flow return 200 and valid JWT                      |
| 4   | POST     | Authorization flow with incorrect HTTP method returns 405                   |

Classwork + homework12 for auth-flow.spec.ts

| No  | Endpoint    | Test                                            |
| --- | ----------- | ----------------------------------------------- |
| 5   | POST        | successful authorization and creat order        |
| 6   | POST /GET   | successful authorization and get order by ID    |
| 7   | POST/DELETE | successful authorization and delete order by ID |
