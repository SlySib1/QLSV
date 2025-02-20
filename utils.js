const fs = require("fs");
const path = require("path");

const STUDENT_FILE = path.join(__dirname, "data", "students.json");
const STATUS_FILE = path.join(__dirname, "data", "status.json");
const DEPARTMENT_FILE = path.join(__dirname, "data", "department.json");
const PROGRAM_FILE = path.join(__dirname, "data", "program.json");

function loadStudents() {
    try {
        const data = fs.readFileSync(STUDENT_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function loadStatus() {
    try {
        const data = fs.readFileSync(STATUS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function loadDepartment() {
    try {
        const data = fs.readFileSync(DEPARTMENT_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function loadProgram() {
    try {
        const data = fs.readFileSync(PROGRAM_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidDepartment(department) {
    const validDepartments = loadDepartment();
    return validDepartments.some(s => s.department === department);
}

function isValidStudentStatus(status) {
    const validStatuses = loadStatus();
    return validStatuses.some(s => s.status === status);
}

module.exports = { loadStudents, loadStatus, loadDepartment, loadProgram, isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus };
