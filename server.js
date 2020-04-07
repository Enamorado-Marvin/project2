const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Access library attributes from the imported modules
var patient = require('./routes/patient')

var app = express()

// Use the set() method to store values
app.set('port', process.env.PORT || 5000)

// Set EJS engine as the default engine
app.set('view engine', 'ejs')

// Use the body-parser body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

// Express routes for the HTTP 'GET' methods
app.get('/', home)
app.get('/patient', patient.list)
app.get('/patient/add', patient.add)
app.get('/patient/delete/:id', patient.delete)
app.get('/patient/edit/:id', patient.edit)

// Express routes for the HTTP 'POST' methods
app.post('/patient/add', patient.save)
app.post('/patient/edit/:id', patient.update)

// Set a port for the app to listen on
app.listen(app.settings.port, function () {
console.log('Server is running on Port 5000. Press CTRL+C to stop server.')
})

function home(req, res){
	res.render('index', { title: "Welcome"})
}


