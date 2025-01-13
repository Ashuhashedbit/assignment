const express = require('express');
const router = express.Router();
const db = require('../db');



//http://localhost:4000/users/allusers
router.get('/allusers', async (req, res) => {
    try {
        const response = await db.promise().query('SELECT * FROM users');
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
})
//http://localhost:4000/users/getuser/:userid
router.get('/getuser/:userid', async (req, res) => {
  try {
      const userid = req.params.userid;
      const response = await db.promise().query(`SELECT * FROM users where userid='${userid}'`);
      res.status(200).json(response[0]);
  }
  catch (err) {
      res.status(400).json(err);
  }
})

//http://localhost:4000/users/adduser
router.post('/adduser', async (req, res) => {
    try {
        const { name, email, gender,mobile,password, usertype } = req.body;
        const userid = parseInt(Math.random() * 10000000000);
        //console.log(userid);
        const username = name.toLowerCase().split(' ').join('').slice(0, 5) + parseInt(Math.random() * 100000);
        await db.promise().query(`INSERT INTO users (userid,username,name,email,gender,mobile,password,usertype)
                         VALUES ('${userid}','${username}',' ${name}','${email}','${gender}',
                          '${mobile}','${password}','${usertype}' )`);
        res.status(200).json({ message: `User ${username} Added Successfully` });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//http://localhost:4000/users/updateuser/:userid
router.post('/updateuser/:userid', async (req, res) => {
    try {
        const { name, email, gender,mobile, usertype } = req.body;
        let userExists = await checkUserByEmail(email);
        if(userExists){
            await db.promise().query(`update users set name ='${name}', gender='${gender}',
                mobile='${mobile}',usertype='${usertype}' where userid='${userid}'`);
        res.status(200).json({ message: `User ${username} updated Successfully` });
        }
        
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// http://localhost:4000/users/removeuser/:userid
router.delete('/removeuser/:userid', async (req, res) => {
    try {
      const userid = req.params.userid;
  
      if (req.params.userid) {
        const response = await db
          .promise()
          .query(`delete from users WHERE userid = '${userid}'`);
        res.status(200).json(response[0]);
      } else {
        res.status(400).json({ message: 'Request UserId not Found.' });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // http://localhost:4000/users/login
  router.post('/login', async (req, res) => {
    
      if (!req.body) {
          res.status(400).json({ message: "Invalid/Missing Data" })
      }
      try {
        const {username, password } = req.body;
          const response = await db.promise().query(`SELECT password, userid, username, email FROM users where 
          ( username = '${username}')`);
          if (response[0].length > 0) {
              if(response[0][0].username === username && response[0][0].password === password)  {
                const response = await db.promise().query('SELECT * FROM users');
                res.status(200).json(response[0]);
              }
              else {
                  res.status(401).json({ message: 'Incorrect Password'});
              }
          }
          else {
              console.log('user not found')
              }
          }
       catch (err) {
          res.status(400).json(err);
      }
  })



module.exports = router;