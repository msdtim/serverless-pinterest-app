# Serverless Pinterest App

Udacity Cloud Developer ND Capstone Project

The goal of this project is to build a web app that behave like a miniature versions of well-known social media website [pinterest.com](http://pinterest.com).

The backend of app is a set of RESTful API built using serverless framework, then automatically deploy to AWS resources include APIGateway, Lambda and DynamoDB.

The frontend client is developed using REACT and Semantic UI. To interact with this app, you can clone this repo, under the `./client` folder, run `npm i` and `npm start`. It will start a local client on localhost:3000

## Features

### Authentication

User need to login and properly authenticated to access the content of this application. 3rd party service provider Auth0 is used to handle the authentication.

Greeting page for new users:

### Content Ownership

My Boards page stores user created data. User can create boards, upload images to different boards. User can delete individual image or a board along with the images belong to this board.

### Content Discovery

User can browser other user's content in the Discover page. User can click the Pin button to save the images to My Pins page to view them later. User can unPin in the My Pins page.

## Next steps

Future improvements could be done in two areas. 

1. Allow user to organize My Pins in to different boards.
2. Better content discovery. For example, provide search or recommendations function in the Discover page.
