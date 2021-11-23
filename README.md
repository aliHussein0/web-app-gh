Hello !

To run the project you must open 2 terminals preferably; one for the backend, the other for the frontend;

-backend terminal:

First make sure you are in the right path (.../backend> ), then type:
>nodemon server 
>>this will start your backend using Mongodb and express.

-frontend terminal:

First make sure you are in ther right path (.../frontend> ), then type:
>npm install
>>this will install all requiered npm packages (should take like 5-10 mins to finish).

after that type:

> npm start
>>this will start your react frontend and it will run on your browser.


When starting the project you will have a navbar with 2 elements (Customer App element is not included) :

1) Customers List:
you will be shown a list of all customers in the database.
You can add, edit, delete a user.
when adding or editing a user, phone number will be validated, plus all fields are requierd.

2) Validate Phone Number:
simple interface where you enter a number and check if its valid or not.
If number is valid then; country name, country code and provider name will be shown.
If number is not valid it will just tell you that it isn't.

Hope that was helpful.
