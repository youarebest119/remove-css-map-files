#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to remove .css and .css.map files recursively
function removeFiles(dirName) {
    fs.readdirSync(dirName).forEach((file) => {
        const filePath = path.join(dirName, file);

        // Skip node_modules directory
        if (file === 'node_modules') {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            removeFiles(filePath); // Recursive call for directories
        } else {
            const ext = path.extname(filePath);
            const isCss = ext === '.css';
            const isCssMap = ext === '.map' && filePath.endsWith('.css.map');

            // Remove only .css or .css.map files
            if (isCss || isCssMap) {
                fs.unlinkSync(filePath);
                console.log(`Deleted: ${filePath}`);
            }
        }
    });
}

// Main process to read the user input for the directory
const dirPath = process.argv[2];

if (!dirPath || !fs.existsSync(dirPath)) {
    console.log("Please provide a valid directory path");
    process.exit(1);
}

removeFiles(dirPath);
console.log("All .css and .css.map files (excluding node_modules) have been removed.");
