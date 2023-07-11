const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");

const homeRouter = require("./routes/home");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const profileRouter = require("./routes/profile");

const { handlebars } = require("hbs");
const API_KEY_T = require('./tmdb_api_key');
const moment = require("./public/javascripts/moment.min");



const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
	session({
		key: "user_sid",
		secret: "super_secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 600000,
		},
	})
	);
app.get('/', (req, res) => {
	res.render('index', { API_KEY_T }); // Pass the API key to the Handlebars template
		});
	
// clear the cookies and session after user logs out
app.use((req, res, next) => {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie("user_sid");
		
	}
	next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
		res.redirect("/sessions/new");
	} else {
		next();
	}
};

// Custom Handlebars helper function to check if an element exists in an array
handlebars.registerHelper("ifInArray", function (array, element, options) {
	if (array && array.includes(element)) {
	  return options.fn(this);
	} else {
	  return options.inverse(this);
	}
  });


// route setup
app.use("/", homeRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/movies", sessionChecker, moviesRouter);
app.use("/profile", profileRouter);
//app.use("/:id/reviews", sessionChecker, moviesRouter);

app.use(express.static('public', { 
	setHeaders: (res, path) => {
	  if (path.endsWith('.js')) {
		res.setHeader('Content-Type', 'application/javascript');
	  }
	}
  }));
  


// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

handlebars.registerHelper("timeAgo", (date) => moment(date).fromNow());

handlebars.registerHelper('jsonStringify', (context) => {
	return JSON.stringify(context);
});

module.exports = app;
module.exports.sessionChecker = sessionChecker;