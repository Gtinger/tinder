//vi bruger npm run DevStart til at starte appen, dette kører med nodemon

//vi har installeret bcrypt til at hashe pw og bruger information


// vi er in devolpment
//loader alle vores forskellige enviroment variable og sætter dem i proccess.env 

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config')
  const getAge = require('./dob')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )

  const users = []; //vi laver arrays til users og profile, dette ville ikke være optimalt til en "rigtig" produktion, men til dette formål går det an
  //HUSK!!!! al data i disse arrays slettes ved genstart af app
  const profile = [];

  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,  //vi vil ikke gemme hvis intet er ændret
    saveUninitialized: false //vi vil ikke gemme en tom værdi hvis der ikke er en værdi i denne session
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/storage', checkAuthenticated, (req, res) => {
    res.render('storage.ejs', { name: req.user.name })
  })

  app.get('/profilematch', checkAuthenticated, (req, res) => {
    res.render('profilematch.ejs', { 
        name: req.user.name,
        surname: req.user.surname,
        dob: req.user.dob,
        interest: req.user.interest,
        birthplace: req.user.birthplace,
        goals: req.user.goals,
        story: req.user.story,
        favquote: req.user.favquote,   
      })
  });

  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
 

  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {//vi bruger passports authenticate middleware, så vi behøver ikke req,res
    successRedirect: '/',   //hvis success, bliver man send til homepage
    failureRedirect: '/login',//hvis failure bliver man sendt til login page igen
    failureFlash: true //dette gør så vi kan bruge de messages vi har sat op i config.js
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {    // vi laver en try catch da vi bruger asynkron kode
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10) //10 sætter sikkerhedsniveau, 10 er mellem godt, fin sikkerhed ikke for langsomt
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        surname: req.body.surname,
        dob: req.body.dob,
        interest: req.body.interest,
        birthplace: req.body.birthplace,
        goals: req.body.goals,
        story: req.body.story,
        favquote: req.body.favquote
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => { //vi bruger express til logout og vi installerer method override
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  app.listen(8080) ,() => {
      console.log('server running')}