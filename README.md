# verileum API
This application allows you to register, login and get film data and also comment on film data.

# STEPS TO RUN APP
### Step 1: Start up the containers
RUN `docker-compose up -d ` 

RUN `docker container exec -it verileum-task-api npm run typeorm:run`


## STEPS TO RUN LOCALLY

RUN - `npm i`

RUN `cp .env.example .env`

ADD database credentails and paystack test secret key. Please see .env.example

You can change it to mailtrap if you have a mailtrap credentials

#### Notes

1. Paystack currently doesn't allow starter businesses to make third party payouts. You will need a
Paystack account with complete registration.

#### Logs can be seen on the console

#### POSTMAN API Documentation.
[Postman Api documentation](https://documenter.getpostman.com/view/6226738/UVeKp4WU)
