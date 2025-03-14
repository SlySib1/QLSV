const fs = require("fs");
const path = require("path");
const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const STUDENT_FILE = path.join(__dirname, "../data", "students.json");
const STATUS_FILE = path.join(__dirname, "../data", "status.json");
const DEPARTMENT_FILE = path.join(__dirname, "../data", "department.json");
const PROGRAM_FILE = path.join(__dirname, "../data", "program.json");
const RULE_FILE = path.join(__dirname, "../data", "rule.json");

function loadRule() {
    try {
        const data = fs.readFileSync(RULE_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

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

function saveDepartments(departments) {
    fs.writeFileSync(DEPARTMENT_FILE, JSON.stringify(departments, null, 4), "utf-8");
}

function saveStatuses(statuses) {
    fs.writeFileSync(STATUS_FILE, JSON.stringify(statuses, null, 4), "utf-8");
}

function savePrograms(programs) {
    fs.writeFileSync(PROGRAM_FILE, JSON.stringify(programs, null, 4), "utf-8");
}

function saveStudents(students) {
    fs.writeFileSync(STUDENT_FILE, JSON.stringify(students, null, 4), "utf-8");
}

function loadAllowedDomains() {
    const rawData = fs.readFileSync("./data/domain.json");
    const config = JSON.parse(rawData);
    return config.allowedDomains;
}

function isValidEmail(email) {
    const allowedDomains = loadAllowedDomains();
    if (!validator.isEmail(email)) return false;

    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
}

function loadAllowedCountries() {
    const rawData = fs.readFileSync("./data/countries.json");
    const config = JSON.parse(rawData);
    return config.allowedCountries;
}

function isValidPhone(phone) {
    const allowedCountries = loadAllowedCountries();
    return allowedCountries.some(countryCode => {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
        if (countryCode === phoneNumber.country) return true;
    });
}

function isValidDepartment(department) {
    const validDepartments = loadDepartment();
    return validDepartments.some(s => s.Department === department);
}

function isValidStudentStatus(currentStatus, newStatus) {
    const validStatuses = loadStatus();
    if (!validStatuses.some(s => s.Status === newStatus)) return false;
    if (currentStatus === "Đang học") {
        return newStatus === "Tạm dừng học" || newStatus === "Đã tốt nghiệp" || newStatus === "Đã thôi học";
    }
    if (currentStatus === "Tạm dừng học") {
        return newStatus === "Đang học" || newStatus === "Đã thôi học";
    }
    if (currentStatus === "Đã tốt nghiệp") {
        return false;
    }
    if (currentStatus === "Đã thôi học") {
        return false;
    }
    return false;
}

module.exports = {
    loadStudents, loadStatus, loadDepartment, loadProgram, loadRule,
    saveDepartments, saveStatuses, savePrograms, saveStudents,
    isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus
};
