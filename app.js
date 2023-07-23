const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["Buy Food", "Cook food", "Eat Food"];
let workItems=[];
app.set('view engine', 'ejs');             //For setting up EJS(Embedded Javascript Templating)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { KindOfDay: day, newListItem: items });          // Updates the variable KindOfDay and newListItems in list.ejs according to the current day and content stored in item array
});
app.get("/work",function(req,res){
    res.render("list",{KindOfDay:"Work List",newListItem:workItems});
})
app.post("/work", function (req, res) {
    let item = req.body.newItem;

    workItems.push(item);
    res.redirect("/");

})
app.post("/", function (req, res) {
    let item = req.body.newItem;
    if(req.body.list==="Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
    items.push(item);
   
    res.redirect("/");
    }

})
app.listen(3000, function () {
    console.log("Function is up and running");
});