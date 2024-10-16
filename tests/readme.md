| No  | Endpoint | Test                                                                                 |
| --- | -------- | ------------------------------------------------------------------------------------ |
| 1   | PUT      | Put order with valid data should receive code 200                                    |
| 2   | PUT      | Put order with invalid data should receive code 400                                  |
| 3   | DELETE   | Delete order by providing valid data should receive code 204                         |
| 4   | DELETE   | Delete order by providing invalid id should receive code 400                         |
| 5   | GET      | Authenticate a user by providing valid username and password should receive code 200 |
| 6   | GET      | Authenticate a user by providing just username should receive code 500               |
