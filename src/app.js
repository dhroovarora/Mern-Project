
const { response } = require("express");
//Importing a module where express is a module with functions or objects or variables assigned to it .
const express = require("express");
//Loads the handlebars module
const hbs = require("hbs");
// The Path module provides a way of working with directories and file paths.

const path = require("path");
// The path.join() method joins the specified path segments into one path.

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
// This is the minimum needed to connect the myapp database running locally on the default port (27017).

const app = express();
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// The app.use() function is used to mount the specified middleware function
// The middleware function is executed when the base of the requested path matches the path.

app.use(express.static(static_path));
//Sets app to use the handlebars engine
app.set("view engine", "hbs");
app.set("views", template_path);
// registerPartials provides a quick way to load all partials from a specific directory

hbs.registerPartials(partials_path);
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
//  built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.

app.use(express.urlencoded({ extended: false }));
require("./db/conn");
const Register = require("./models/register");
const port = process.env.PORT || 3000;
// Sets a basic route
// app.get(): This function tells the server what to do when get requests at a given route.
// The res. render() function is used to render a view and sends the rendered HTML string to the client.
app.get("/", (req, res) => {
    res.render("index.hbs")
});


app.get("/register", (req, res) => {
    res.render("register.hbs")
});


app.get("/login", (req, res) => {
    res.render("login.hbs")
});

app.get("/index", (req, res) => {
    res.render("index.hbs")
});

// The app.post() function routes the HTTP POST requests to the specified path with the specified callback functions.
app.post("/register", async (req, res) => {
    // console.log("enter");

    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword,
            })
            const registered = await registerEmployee.save();
            // if(registered)
            // {
            //     console.log("success");
            // }else{
            //     console.log("failed");
            // }
            res.status(201).render("index");
        }
        else {
            res.send("Password Not Matching");
        }
    }
    catch (error) {
        res.status(400).send(error);
        // console.log(err0r);

    }
})
// Makes the app listen to port 3000
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})