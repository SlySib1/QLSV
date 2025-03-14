const fs = require("fs");
const path = require("path");

function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
}

module.exports = { readJSONFile, writeJSONFile };
