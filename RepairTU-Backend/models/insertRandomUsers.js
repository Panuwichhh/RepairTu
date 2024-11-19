const mongoose = require('mongoose');
const User = require('./user'); // Import the User model
const faker = require('faker');        // Import faker for random data generation

// Function to generate and insert random data
const insertRandomUsers = async (count) => {
    const users = [];
    // Loop to generate random users
    for (let i = 0; i < count; i++) {
        users.push({
            username: faker.internet.userName(),
            studentId: faker.internet.password(),
            password: faker.internet.password(),
            role: "user"
        });
    }

    // Insert all users into the database
    try {
        await User.insertMany(users);
        console.log(`${count} random users inserted`);
    } catch (error) {
        console.error('Error inserting random users:', error);
    }
};

// Call the function with the desired number of random users to insert
insertRandomUsers(10).then(() => {
    // Close the connection after insertion
    mongoose.connection.close();
});

// module.exports = insertRandomUsers;
