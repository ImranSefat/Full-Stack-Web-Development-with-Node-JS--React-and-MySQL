const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')


app.use(express.json())
app.use(cors())

const PORT = 3001

const db = mysql.createConnection({
    host : 'localhost',
    port : "8889",
    user: 'root',
    password: 'root',
    database : 'Notes'
})



app.get('/', (req, res) => {
    res.send({
        "message": "Hello from a Node Server!"
    })
})

app.get('/notes', (req, res) => {
    db.query("SELECT * FROM notes", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.get('/notes/id', (req, res) => {

    const uid = req.body.uid

    db.query(`SELECT * FROM notes WHERE uid = ${uid}`, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})



app.listen(PORT, () => {
    console.log("Server is running on PORT 3001")
})


