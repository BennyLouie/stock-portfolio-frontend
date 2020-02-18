This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

This repository works as the frontend of my Stock Portfolio Application.

## Tools used

This app is built using Rails [6.0] as a backend to store and retrieve data using a PostgreSQL database. Bcrypt and JWT Auths were utilized to manage secure passwords and user logins.

The frontend uses React JS to build user interfaces and Redux to manage user states. React Routers have also been utilized to control app navigation. React Semantic UI has been used to customize CSS.

The app also uses IEX Cloud API for the stock data.

### A Brief Summary

In this app, users can create an account using their first and last names, email, and a password.

The app will utilize JWT tokens to authorize users and log them into their account.

Once logged in, a user will see a list of the current most active stocks as well as a checkout form.

A user can input a valid 'ticker' (symbol) and a number to 'purchase' the shares.

By clicking on the 'Portfolio' link, the app takes you to your portfolio where you will see a list of all the stocks you currently own and the number of shares you own. You will see the most updated price of those shares as well.

If the current price of the stock is less than the opening price, the color of the stock will turn green. If it is less, it will turn red. If it is equal to the opening price, it will turn grey.

(During weekends or holidays, there are no opening prices so it is defaulted to the current/latest price. It will be grey.)

By clicking on the 'Transactions' link, you will be taken to a page that lists all the transactions you have made.

Error messages have also been included.

---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------

https://youtu.be/F97isHOIvKs