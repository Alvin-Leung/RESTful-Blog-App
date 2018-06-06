var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
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

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSanitizer());

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, foundBlogs ) {
        if (err) {
            console.log(err);
        }
            
        res.render("index", { blogs: foundBlogs });
    });
});

app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.create(req.body.blog, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/blogs/new");
        }
        else {
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.get("/blogs/:id", function(req, res) {
    var id = req.params.id;
    
    Blog.findById(id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", { blog: foundBlog }); 
        }
    })
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } 
        else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    }); 
});

app.listen(3000, function() {
    console.log("server has started..");
});