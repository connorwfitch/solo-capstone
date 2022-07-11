# Twodoist 
Twodoist is a clone of the popular task-manager app Todoist. Twodoist is built using technologies such as React, Node, Postgres, and Express.

### Try it out!
[Live heroku link!](https://twodoist.herokuapp.com)

### Important Links
* [Feature List](https://github.com/connorwfitch/solo-capstone/wiki/Feature-List)
* [Database Schema](https://github.com/connorwfitch/solo-capstone/wiki/Database-Schema)
* [Frontend Routes and Wireframes](https://github.com/connorwfitch/solo-capstone/wiki/Front-End-Routes-and-Wireframes)
* [Backend Routes](https://github.com/connorwfitch/solo-capstone/wiki/Backend-Routes)

### Technologies used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Pages

#### Splash
<img width="1512" alt="Screen Shot 2022-07-11 at 6 53 04 PM" src="https://user-images.githubusercontent.com/49599743/178373011-72404b13-28c0-46fa-a155-adb8dfb7e0d5.png">
#### Log in
<img width="1512" alt="Screen Shot 2022-07-11 at 6 53 24 PM" src="https://user-images.githubusercontent.com/49599743/178373045-1b80c47e-dbf7-4ef9-a75c-070a11187e34.png">
#### Sign up
<img width="1512" alt="Screen Shot 2022-07-11 at 6 53 50 PM" src="https://user-images.githubusercontent.com/49599743/178373068-d4a7b625-3837-4d05-85b1-03d9c179be13.png">
#### App main
<img width="1512" alt="Screen Shot 2022-07-11 at 6 56 02 PM" src="https://user-images.githubusercontent.com/49599743/178373098-5d3713ce-4e50-4fdf-b263-5c9d9b81b7c5.png">
#### Task Creation
<img width="1512" alt="Screen Shot 2022-07-11 at 6 57 22 PM" src="https://user-images.githubusercontent.com/49599743/178373116-fdf27ce4-930d-4e7a-84c0-28cd5b109fec.png">
#### List creation
<img width="1512" alt="Screen Shot 2022-07-11 at 6 58 07 PM" src="https://user-images.githubusercontent.com/49599743/178373141-ff7ced04-487c-434b-88c5-ebabaeb669c0.png">


### Installation Instructions
1. Clone the repository using `git clone git@github.com:connorwfitch/solo-capstone.git`
2. Install frontend packages using `cd frontend` and `npm install`
3. Install backend packages using `cd ../backend` and `npm install`
4. Add `.env` file in backend directory using `touch .env` and setting it up as outlined in `.env.example`
5. Create a Postgres user in accordance with your `.env` file
6. Create, migrate, and seed your database by running the following commands
  * `npx dotenv sequelize db:create`
  * `npx dotenv sequelize db:migrate`
  * `npx dotenv sequelize db:seed:all`
7. Open up two terminals one for `/frontend` and the other for `/backend`, and run `npm start` in both
8. If not automatically redirected, navigate in your browser to `http://localhost:3000/`

### Technical Challenges

### Future To-Dos
