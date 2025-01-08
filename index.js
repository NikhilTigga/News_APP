import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";


// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const port=3000;
env.config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let query="India";


// Serve main.html at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"));
});

app.get("/api/news", async (req,res)=>{
    console.log('Fetching news articles...'); // Debug log
    try{
        const result=await axios.get("https://newsapi.org/v2/everything",{
            params:{q:query,apiKey:process.env.api_Key}

        });
        console.log('Articles fetched:', result.data.articles); // Log articles
        res.json(result.data.articles);
    }
    catch(error){
        console.error('Error fetching articles:', error.message); // Log errors
        res.status(404).json({error:error.message});

    }
});
app.get("/cricket",(req,res)=>{
query="cricket";
res.redirect("/");
});
app.get("/football",(req,res)=>{
    query="football";
    res.redirect("/");
    });
    app.get("/hockey",(req,res)=>{
        query="hockey";
        res.redirect("/");
    });
    app.get("/cricket",(req,res)=>{
        query="cricket";
        res.redirect("/");
    });
    app.get("/business",(req,res)=>{
        query="business";
        res.redirect("/");
        });
        app.get("/entertainment",(req,res)=>{
            query="entertainment";
            res.redirect("/");
        });
        app.get("/politics",(req,res)=>{
            query="politics";
            res.redirect("/");
        });
        app.get("/home",(req,res)=>{
            query="India";
            res.redirect("/");
        });
        app.get("/search",(req,res)=>{
            query=req.query.searchvalue;
            res.redirect("/");

        });
        

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});