# What To Do Mobile
Home Page with Markers            |  Home Page With Activity Chosen | Custom Search With Options Listed
:-------------------------:|:-------------------------:|:-------------------------:
![](https://i.imgur.com/AXbRlKN.png)  |  ![](https://i.imgur.com/5bcP5RD.png) | ![](https://i.imgur.com/J7jqxr6.png)

## Attention:
This is specifically the mobile version of the project.

You can reach the live version of the web application at https://what-to-do-7d9ec.firebaseapp.com/ or you can reach the GitHub of the web application Frontend and Backend at https://github.com/kpete2017/What_To_Do

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

What-to-do is a mobile application for IOS and Android that checks various catagories of activity (Fast Food, Outdoor, Dining, Shopping, or Custom) and displays on a map nearby locations for said activity. The User can than pick a desired activity or let the app choose for them witha random search. THe point of this application is to help the user deside on what to do with either a curated list or random selection.

This application was built with a React Native frontend and a Ruby on Rails backend.

The Google Maps, and Yelp Fusion API's were used in the creation of this app.


### Built With
* React Native
* Expo
* React-Native-Navigation
* Ruby on Rails
* Postgresql
* JWT
* Heroku


<!-- GETTING STARTED -->
## Getting Started

In order to run the mobile version of this project locally you will need [Node.js](https://nodejs.org/en/)

## How To Get Started

1. Clone this repository

2. cd into the main directory

3. run `yarn install`

4. run `yarn start`

5. Then through the expo window, run the app on any choice of physical device or emulator

## Usage

### Home Screen
* The home screen is where all the features are kept.
* The top portion of the home screen contains the Google Map which will contain the users current location as well as generate markers for the activities when they are selected. 
* Scroll down a little and there will be four different buttons each representing a catagory of activity. At a click the app will search all open nearby activities based on the catagory and place. It will than add a marker on the map which represents its current location.
* A list will be also be generated at the bottom section of the screen. The user can also scroll down the list and pick a restaurant manually. On click the map will zoom in on the activities location and give a brief description of the location.
* The user can also opt to "Try Again" which will randomly pick another item out of the list if they did not like the activity that was presented to them.

## ToDo
* The Signup component is styles and completed but not yet ready for release. It requires some more debugging with the KeyboardAvoidingView as well as some more touchup.

<!-- CONTACT -->
## Contact

Kyle Petersen - [Linked-In](https://www.linkedin.com/in/kyle-petersen-27259b18b/) - kpete2017@gmail.com
