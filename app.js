// required() is similar to import in python
// express js makes it easier and faster to build server-side web applications
// ejs allows users to generate HTML template with js
// reference: https://ejs.co/#install 
const express = require("express");
const ejs = require("ejs");
const bodyPareser = require("body-parser");

// import from date file
const date = require(__dirname + "/date.js");


const app = express();


// parse through html body
app.use(bodyPareser.urlencoded({extended: true}));

// allow express to access static file
app.use(express.static("public"));


// view engine allows programmers render/display output to web pages using template files
// function: set view engine to esj
app.set("view engine", "ejs")


// default list
const items = ["wake up", "brush my teeth", "eat breakfast"];
// work list
const workItems = [];



// res.send() indicates that it is the final statement that being send
// res.write() sends mulitple statements 
// res.sendFile() sends a whole file with multiple statements


// render list for home page
app.get("/", function(req, res) {

    // call function from date file
    const day = date.getDate();

    // render the ejs file and replace the key with the value day 
    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});


// render list for work page
app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});



// take in request from browser and perform an action 
// then direct back to app.get as the page gets render again
app.post("/", function(req, res) {

    let item = req.body.newItem;

    // if the value of list is work then redirect output to work page
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    // otherwise direct output to home page
    else {
        items.push(item);
        res.redirect("/");
    }

});



// app.listen() function is used to bind and listen into the connections on the specified host and port
app.listen(3000, function() {
    console.log("Sever started on port 3000!");
})