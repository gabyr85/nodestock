// added comment
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 8000;

//Set handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


// Set handlebar routes
app.get('/', function(req, res) {
    res.render('home', {
    	stuff: "This is stuff..."
    });
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
