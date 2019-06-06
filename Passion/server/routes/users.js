const express = require('express');
const router = express.Router();
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserCollection = require("../models/userSchema.js");
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    UserCollection.findById(id, function (err, user) {
        done(err, user);
    });
});

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
};

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// if someone favorites a game, adds a profile picture or adds a background image
router.put("/updateUser", (req, res) => {
    if (req.body.profilePicture || req.body.BackgroundImage) {
        UserCollection.findOneAndUpdate({"_id":req.body._id},
            {$set:{profilePicture:req.body.profilePicture,BackgroundImage:req.body.BackgroundImage}},(errors,results)=>
        {
            if(errors) res.send(errors);
            else{
                console.log("User images updated");
                res.send(results);
            }
        })
    }
    //ToDo add if someone favorites a game
});

//Strategy for creating a new user in a MERN full-stack project
passport.use("register", new LocalStrategy
(
    {passReqToCallback: true},

    (req, username, password, done) => {
        console.log("Entered Strategy");
        UserCollection.findOne({username: username}, (err, results) => {
            if (err) {
                console.log("error on startup");
                return done(err);
            }
            if (results) {
                console.log("Error: User Already Exists");
                return done(null, false, {message: "Account Exists"});
            } else {
                console.log("Made it Through strategy");

                let newUser = new UserCollection;

                newUser.username = username;
                newUser.password = createHash(password);
                newUser.BackgroundImage = req.body.BackgroundImage;
                newUser.profilePicture = req.body.profilePicture;
                /*newUser.item to save = [req.body.item to save];*/

                newUser.save((err) => {
                    if (err) {
                        console.log("Cannot save User");
                        throw err;
                    }
                });

                console.log("New User Made");

                return done(null, newUser);
            }
        })
    }
));

router.post("/addNewUser",
    passport.authenticate("register", {failureRedirect: "/users/creationFail"}), (req, res) => {
        console.log("Made it through the strat");
        res.send("Creation Complete")
    }
);

router.get("/creationFail", (req, res) => {
    res.send("Failed to create User");
});

// Strategy for logging in and making sure information is correct
// Local Strategy {copied from past lecture for times sake} for making sure a user exists and the information entered is correct
passport.use(new LocalStrategy(
    // req is the request of the route that called the strategy
    // username and password are passed by passport by default
    // done is the function to end the strategy (callback function).
    function (username, password, done) {
        console.log("Local Strat");
        // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
        UserCollection.findOne({username: username}, function (err, user) {
            // If there is a MongoDB/Mongoose error, send the error
            if (err) {
                console.log("1");
                return done(err);
            }
            // If there is not a user in the database, it's a failure and send the message below
            if (!user) {
                console.log("2");
                return done(null, false, {message: 'Incorrect username.'});
            }
            // Check to see if the password typed into the form and the user's saved password is the same.
            if (!isValidPassword(user, password)) {
                console.log("3");
                return done(null, false, {message: 'Incorrect password.'});
            }
            console.log("4");
            console.log(user);
            // null is here because there is not an error
            // user is the results of the findOne function
            return done(null, user, {user: user.username,_id:user._id});
        });
    }
));

router.post("/login", passport.authenticate("local", {failureRedirect: "/users/verificationFailure"}), (req, res) => {
        req.session.username = req.body.username;
        console.log("trying to set cookie data");
        res.send(req.user._id);
    }
);

router.get("/verificationFailure", (req, res) => {
    res.send("Failed to log in");
});

router.get("/logout", (req, res) => {
    console.log("logging out");
    res.session.username = null;
    res.send(null);
});

//ToDo build a strategy to take care of verifying before deleting a user
router.delete("/removeUser",(req,res)=>
{
   UserCollection.findOneAndDelete({username:req.body.username},(errors,results)=>
   {
       if(errors)
       {
           res.send(errors);
       }
       else
           {
               console.log("Removed Account");
               res.send(results);
           }
   })
});

module.exports = router;
