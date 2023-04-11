// added comment
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

// use body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API Key pk_b71b69468c874672b5c0a3d98930476e
// pk_b71b69468c874672b5c0a3d98930476e
//sk_3585584c076c413197999e42cd1e07b9
//create Call API function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=sk_3585584c076c413197999e42cd1e07b9', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200) {
	
		finishedAPI(body);
		};
	});

};

//Set handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "hello there...";


// Set handlebar  get index routes
app.get('/', function(req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
    		stock: doneAPI
    	});
	}, "fb");
});

// Set handlebar index POSTroutes
app.post('/', function(req, res) {
	call_api(function(doneAPI) {
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
    		stock: doneAPI,
    		
    	});
	}, req.body.stock_ticker);
});


app.get('/about.html', function(req, res) {
    res.render('about');

});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
