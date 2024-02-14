const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');
const router = require('./routes/AuthRoutes');
const roleRouter = require('./routes/RoleRouter');
const permissionRouter = require('./routes/PermissionRoutes');
const PORT= 5000;
const swaggerui= require ('swagger-ui-express');
const yaml = require('yamljs');


env.config();
const app =express();

// Swagger documentation setup
const swaggerDocument = yaml.load('../swagger.yaml');
app.use('/api-auth', swaggerui.serve, swaggerui.setup(swaggerDocument));




app.use(cors()); 
app.use(express.json());
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