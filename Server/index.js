const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());

app.use(express.static('../Client'))

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'localpassword1',
    database: 'user_app',
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})

app.post('/insert', (req,res) =>{

    const {name, email, age, gender} = req.body; 

    const sqlCheckName = "SELECT COUNT(*) AS userCount FROM users WHERE Name = ? ;";
    db.query(sqlCheckName,[name],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({status: 'error', message:'Internal server error, try again!'})
        }

        const userCount = result[0].userCount;
        
        if(userCount > 0){
            return res.status(400).json({status:'error-user', message: 'User with this name already exists, write another!'})
        }

        const sqlInsert = "INSERT INTO users (Name, Email, Age, Gender) VALUES (?, ?, ?, ?) ;";
        db.query(sqlInsert,[name,email,age,gender], (err,result) =>{
            if(err){
                console.error(err);
                return res.status(500).json({status: 'error', message:'Internal server error, try again!'})
            }
            else{
                return res.status(200).json( {status :'success', message:'User added successfully!'});
            }
        })
    }) 
})

app.get('/get', (req,res)=>{
const sqlGet = "SELECT * FROM user_app.users;"
db.query(sqlGet,(err,result)=>{
    if(err){
        console.error(err);
        return res.status(500).json({status: 'error', message:'Internal server error, try again!'})
    }
    else{
        return res.status(200).json(result);    
    }
})
})

app.delete('/delete', (req, res)=>{
    const sqlDelete = "DELETE FROM users WHERE Name = ?;"
    const {name} = req.body;

    const sqlCheckName = "SELECT COUNT(*) AS userCount FROM users WHERE Name = ? ;";   
    db.query(sqlCheckName,[name], (err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({status:'error', message:'Internal server error, try again!'});
        }
        userExist = result[0].userCount;

        if(userExist == 0){
            return res.status(400).json({status:'error-user', message: "Misspelled name or user doesn't exist!"});
        }

        db.query(sqlDelete,[name],(err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).json({status:'error', message:'Internal server error, try again!'});
            }
            else{
                return res.status(200).json({status:'succes', message:'User deleted!'});
            }
        })
    }) 
})

app.put('/update', (req,res)=>{

    const {name, updatedEmail,updatedAge,updatedGender} =req.body;
    const sqlCheckName = "SELECT COUNT(*) AS userCount FROM users WHERE Name = ? ;";
    const sqlUpdateData = "UPDATE users SET Email = ?, Age = ?, Gender = ? WHERE Name = ?";

    db.query(sqlCheckName,[name],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).json({status:'error', message:'Internal server error, try again!'});
        }
        userExist = result[0].userCount;

        if(userExist == 0){
            return res.status(400).json({status:'error-user', message: "Misspelled name or user doesn't exist!"});
        }

        db.query(sqlUpdateData, [updatedEmail, updatedAge, updatedGender, name], (err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).json({status:'error', message:'Internal server error, try again!'});
            }
            else {
                return res.status(200).json({status:'succes', message:'User updated!'});
            }
        })
    })
})





