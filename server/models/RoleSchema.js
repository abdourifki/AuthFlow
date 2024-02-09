const mongoose = require('mongoose');

const RoleSchema =  new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    permissions:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Permission"

    }
    
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;