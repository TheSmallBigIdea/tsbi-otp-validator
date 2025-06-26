const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Function to recursively load routes from a directory
const loadRoutes = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            // Recursively load routes from subdirectories
            loadRoutes(fullPath);
        } else if (file.endsWith('.js')) {
            const route = require(fullPath);

            // Ensure the file exports a valid Express router before using it
            if (route && typeof route === 'function') {
                router.use(route);
            } else {
                console.warn(`Skipping ${file}: Not an Express router`);
            }
        }
    });
};

// Load all routes starting from the current directory
loadRoutes(__dirname);

module.exports = router;
