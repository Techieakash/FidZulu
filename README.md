# Backend Halwai Team

 

## Install

 

    npm install
    npm install express -g 
    npm install nodemon -g

 

## Run the app

 

    npm start
    npm test

 

## Endpoints

`GET /food/all/:location`


    curl -i -H 'Accept: application/json' http://localhost:3032/food/all/IN
    
  Returns product with price

    [*] Possible values for location - [IN,US-NC,IE]
    [*] If location is empty or invalid return 400 status code
    [*] We can also send the option parameters with querytype minprice,maxprice,rating or brand
    [*] If all the query parameter is wrong then it will return 400 status code


`GET /food/team`

 

    curl -i -H 'Accept: application/json' http://localhost:3032/food/team
  Returns team name and Members in the team