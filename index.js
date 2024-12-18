import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


  

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

let currentTitle = "";
let currentText = "";

const post_card = [];

app.post("/create", (req, res) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  console.log("Title:", postTitle, "Content:", postContent);
  if(postTitle&&postContent){
    post_card.push({title:postTitle,content:postContent});

  }
  
  
  

  res.redirect("/"); 
});

app.post("/delete", (req, res) => {
  const index = req.body.index;

  if (index !== undefined) {
    post_card.splice(index, 1); // Remove the post at the given index
  }
  res.redirect("/"); // Redirect back to the home page
});

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: post_card });
});
  

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
