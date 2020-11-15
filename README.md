# What To Do Mobile
![Image of Home](https://i.imgur.com/QkB4Hlg.png)

## Live-Site
https://what-to-do-7d9ec.firebaseapp.com/

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project

What-to-do is a web application that checks various catagories of activity (Indoor, Outdoor, Dining, Shopping) and displays on a map nearby locations for said activity. The App can then pick a random activity or sort the activities by user favorites or blacklists.

The application was built using Ruby on Rails for the back-end and HTML5 CSS3 and Javascript on the front-end.

The Google Maps, Google Places, and Google GeoLocation API's were used in the creation of this app.


The Website Contains :
* A main page that shows the users location on the main map.
* Activity buttons that show all nearby catagorites of that activity
* A favorites mode that allows the user to search nearby catagories but only return what is included on their favorites list.
* A blacklist mode that allows the user to search nearby catagories but only returns what is isnt included on their blacklist.

### Built With
* React Native
* HTML5
* CSS3
* Ruby on Rails
* Postgresql
* JWT
* Heroku
* Google Firebase


<!-- GETTING STARTED -->
## Getting Started

In order to run the backend of this project locally you will need [Postgresql](https://www.postgresql.org/) and [Ruby on Rails](https://rubyonrails.org/)

In order to run the frontend of this project locally you will need [Node.js](https://nodejs.org/en/)

## How To Get Started

1. Clone this repository

2. In your terminal cd into the Backend directory

3. bundle install the gems required to load this app

4. rails db:create to create the database

5. rails db:migrate to create the necessary tables in the database

6. rails db:seed to seed the database with some users and media queries

7. rails s to run the database's server on port 3000

8. In a separate terminal cd into the frontend directory

9. npm i lite-server to install lite-server

10. lite-server to run the frontend on port 3001

11. Then use the window that appears and have fun with the app

## Usage

### Main Page
![Image of Home](https://i.imgur.com/O1sbuBZ.png)
* The main page is where all the fetaures are kept.
* At the very center of the page is the map which shows the user's genereal location with a blue marker representing the center of the map. 
* Scroll down a little and there will be five different buttons each representing a catagory of activity. At a click the webapp will search all open nearby atcivities based on the catagory and place a marker on the map of its location as well as display a list of all the activities below.
* once clicked a list of every activity will be listed below as well as four new buttons. The first from the left will randomly pick an item from the list, the second from the left will randomly pick one that is included in the users favorties, the third from the left will pick a random activity as long as it is not included in the user's blacklist, and the fourth button will clear all markers and iteams from the list.
* The user can also scroll down the list and pick a restaurant manually. On click the map will zoom in on the activities location and give a brief description of the location.
* The user can also opt to "Try Again" which will randomly pick another item out of the list if they did not like the activity that was presented to them.

### Favorites Settings
![Image of Notes](https://i.imgur.com/APYKzpI.png)
From here the user can add or remove activities from their favroties list which can then searched through during the users activity search.

### Blacklist Settings
![Image of Party](https://i.imgur.com/mulVOLd.png)
From here the user can add or remove activites from their blacklist which means they will never show up in a random search if prompted.

<!-- CONTACT -->
## Contact

Kyle Petersen - [Linked-In](https://www.linkedin.com/in/kyle-petersen-27259b18b/) - kpete2017@gmail.com
