# fields_bank

View Live Project - Hosted on 000webhost: https://fieldbwebsite.000webhostapp.com/

This website application was developed using php, mySQL and javascript and allows the user to view the bank homepage, login to two separate accounts as defined in the mySQL database using the usernames and passwords below. Once logged in you will be able to view your bank account summary, transfer and loan money. A php mySQL databse is used to store account data (money movements and movementDates) and is used to interact with and update the database given the operations performed in the application.

The account summary provides account total, and list of individual movements (withdrawals and deposits) and the dates on which these took place. A combination of php and javascript are used connect to the database and update the UI and stored data.

Error handling is performed wherby an error array is consistently checked for outstanding errors to display. A 404 php page exists to direct routing errors and will automatically direct the user back to the homepage.

A routing structure handles all links to pages and redirects to the correct page using query strings.

# Default User:
name - Adam King (use for transfers)
username: default_user
password: 1234

# Secondary User:

name - Sarah White (use for transfers)
username: second_user
password: 5678
