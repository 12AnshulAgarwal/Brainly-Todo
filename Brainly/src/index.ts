import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB, UserModel, ContentModel, LinkModel } from './db';
import { random } from './utils';
import isAuthenticated from './middleware';
import cors from "cors";

const app = express();
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev server
    'https://week-15-brainly-9eez.vercel.app', // Your frontend URL
    'https://*.vercel.app' // Allow all Vercel apps
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDB();

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

const jwt_secret = process.env.SECRET_KEY;
if (!jwt_secret || typeof jwt_secret !== "string") {
    throw new Error("JWT secret not exists");
}

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Brainly API is running!" });
});

app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development"
    });
});

app.post("/api/v1/signup", async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {  // Added name check
            return res.status(400).json({
                message: "All fields are mandatory"
            });
        }
        
        const user = await UserModel.findOne({ name });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this name"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to create account"  // Fixed error message
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        
        const user = await UserModel.findOne({ name });
        if (!user || !user.password) {
            return res.status(400).json({
                message: "Incorrect name or password"  // Fixed capitalization
            });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);  // Added await
        if (!passwordMatch) {
            return res.status(400).json({  // Changed status code for consistency
                message: "Incorrect name or password"
            });
        }
        
        const token = jwt.sign({ userId: user._id }, jwt_secret, {  // Fixed typo: userid -> userId
            expiresIn: "1h"  // Standard format
        });
        
        return res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to login"
        });
    }
});

app.post("/api/v1/content", isAuthenticated, async (req, res) => {
    try {  // Added try-catch block
        const { link, type,title } = req.body;
        
        if (!link || !type || !title) {  // Added validation
            return res.status(400).json({
                message: "Link, type and title are required"
            });
        }
        
        await ContentModel.create({
            link,
            type,
            title,
            userId: new mongoose.Types.ObjectId(req.userId),
            tags: []
        });
        
        return res.json({
            message: "Content added successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to add content"
        });
    }
});

app.post("/api/v1/share", isAuthenticated, async (req, res) => {
    try {  // Added try-catch block
        const { share } = req.body;
        
        if (share === undefined) {  // Added validation
            return res.status(400).json({
                message: "Share parameter is required"
            });
        }
        
        if (share) {
            // Remove any existing link for the user
            await LinkModel.deleteOne({ userId: req.userId });
            
            // Generate a unique hash
            let hash = random(10);
            let exists = await LinkModel.findOne({ hash });
            
            while (exists) {
                hash = random(10);
                exists = await LinkModel.findOne({ hash });
            }
            
            // Create new link
            await LinkModel.create({
                userId: new mongoose.Types.ObjectId(req.userId),
                hash: hash
            });
            
            return res.json({ hash });
        } else {
            // If share is false, delete the link
            await LinkModel.deleteOne({ userId: req.userId });
            return res.json({ message: "Link removed" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to update sharing preferences"
        });
    }
});

app.get("/api/v1/content",isAuthenticated,async(req,res)=>{
    const userId=req.userId;
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })
})

// Delete specific content by ID
app.delete("/api/v1/content/:contentId", isAuthenticated, async (req, res) => {
    try {
        const { contentId } = req.params;
        const userId = req.userId;
        
        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required"
            });
        }
        
        // Find and delete the content, but only if it belongs to the authenticated user
        const deletedContent = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: userId
        });
        
        if (!deletedContent) {
            return res.status(404).json({
                message: "Content not found or you don't have permission to delete it"
            });
        }
        
        return res.json({
            message: "Content deleted successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to delete content"
        });
    }
});

app.get("/api/v1/content/:shareLink", async (req, res) => {  // Fixed route and removed isAuthenticated
    try {  // Added try-catch block
        const hash = req.params.shareLink;
        
        const link = await LinkModel.findOne({ hash });
        if (!link) {
            return res.status(404).json({  // Changed status code
                message: "Link not found"
            });
        }
        
        const content = await ContentModel.find({  // Changed to find all content
            userId: link.userId
        });
        
        const user = await UserModel.findOne({
            _id: link.userId
        });
        
        if (!user) {
            return res.status(404).json({  // Changed status code
                message: "User not found"
            });
        }
        
        return res.json({
            username: user.name,
            content: content
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to retrieve shared content"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
export default app;