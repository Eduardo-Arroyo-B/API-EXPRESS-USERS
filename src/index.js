const express = require('express')
const app = express()
const morgan = require('morgan')
const users = require('./routes/users.js')

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/users', users)
app.get('/serverAlive', (req, res) => {
    res.send(`Server is alive on port: ${app.get('port')}`)
})

//Server
app.listen(app.get('port'), () => {
    console.log(`Server listen at port: ${app.get('port')}`)
})