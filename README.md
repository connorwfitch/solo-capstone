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
<img width="1511" alt="main" src="https://user-images.githubusercontent.com/49599743/184197546-29838bb3-fd8d-42c8-8293-e073fc7af578.png">

#### Task creation
<img width="1512" alt="task" src="https://user-images.githubusercontent.com/49599743/184197613-b6c54924-e2d1-487e-b31f-665b0aa00ab8.png">

#### List creation
<img width="1512" alt="list" src="https://user-images.githubusercontent.com/49599743/184197668-89865cea-3c18-4e04-95b6-5888c6c3540b.png">

### Board view
<img width="1512" alt="board" src="https://user-images.githubusercontent.com/49599743/184197723-1a3eebc5-3c8b-4722-8ebe-41738842823d.png">


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
One of the technical challenges that I faced while working on this project was dealing with the logic of the conditions concerned whether a newly-added/newly-edited task should be added (or preserved in the case of edits) to the redux store.

More specifically, I had to create a here condition prop that I would pass into my task creation and edit components; the prop would specify the metric for determining whether the task can stay or whether it will simply be added to the database to be displayed elsewhere. 

For instance, say you are viewing tasks on the 'Today' page and you edit the due date of one of those tasks to be sometime later next week. It follows that the task should not continue to be displayed once the edit is submitted. On the contrary, if that same edit were made on the 'All tasks' page, then it would make sense for the task to remain after the edit.

Some code snippets from the add task component to demonstrate this:

```
const [here, setHere] = useState(hereCondition === 'always');

useEffect(() => {
  if (hereCondition === 'today') {
    setHere(dueAt && dueAt <= new Date()); 
  }
}, [dueAt, hereCondition])

useEffect(() => {
  if (hereCondition === 'list') {
    setHere(listId === defaultList)
  }
}, [listId, hereCondition, defaultList])
```

The `here` value would then be passed on to the thunk, which would then conditionally dispatch an action creator based off of that value:

```
if (response.ok) {
  const output = await response.json();
  if (here) {
    dispatch(addOne(output.task));
  }
  return 'Success';
}
```

### Future To-Dos
