

//
//
//

const router = require('express').Router();
let User = require('../models/user.model');



// '/users/' 
//.find gets a list of all
//returns a promise 
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users)) //return in json format
  .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("call to localhost:5000/users/add")
  const username = req.body.username;
  const newUser = new User({username}); //creating new instance of user with the username 

  //saving user to the database
  newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(404).json("Error: " + err));
});


module.exports = router;
