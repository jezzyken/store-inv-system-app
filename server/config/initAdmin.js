const User = require('../models/User');

async function initializeAdmin() {
    try {
        const adminExists = await User.findOne({ email: 'admin@admin.com' });
        
        if (!adminExists) {
            await User.create({
                fname: 'Jezrell',
                lname: 'Jolampong',
                email: 'admin@admin.com',
                password: 'adminadmin',
                status: 'active',
                role: 'admin'
            });
            console.log('Admin account created successfully');
        }
    } catch (error) {
        console.error('Error creating admin account:', error);
    }
}

module.exports = initializeAdmin;