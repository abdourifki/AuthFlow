const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const router = require('./routes/AuthRoutes');
const roleRouter = require('./routes/RoleRouter');
const permissionRouter = require('./routes/PermissionRoutes');
const PORT= 5000;
const cookieParser=require("cookie-parser")

env.config();
const app =express(); 
app.use(express.json());
app.use(cookieParser());
app.use("/auth",router);
app.use('/roles',roleRouter);
app.use("/permissions",permissionRouter);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Error connecting to MongoDB'+ err);
});
app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
});