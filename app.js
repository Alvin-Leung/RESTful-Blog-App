var express = require("express"),
    mongoose = require("mongoose"),
    app = express();
    
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    created: { type: Date, default: Date.now },
    body: String
});

var Blog = mongoose.model("Blog", blogSchema);

mongoose.connect("mongodb://localhost/restfulblog");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, foundBlogs ) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index.ejs", { blogs: foundBlogs });
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started..");
});