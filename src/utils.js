const fs = require("fs");
const path = require("path");
const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const DATA_PATH = path.join(__dirname, "../data");

const FILES = {
    students: "students.json",
    status: "status.json",
    department: "department.json",
    program: "program.json",
    rule: "rule.json",
    domains: "domain.json",
    countries: "countries.json"
};

function loadJSONFile(fileKey) {
    try {
        const filePath = path.join(DATA_PATH, FILES[fileKey]);
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveJSONFile(fileKey, data) {
    const filePath = path.join(DATA_PATH, FILES[fileKey]);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
}

const loadStudents = () => loadJSONFile("students");
const loadStatus = () => loadJSONFile("status");
const loadDepartment = () => loadJSONFile("department");
const loadProgram = () => loadJSONFile("program");
const loadRule = () => loadJSONFile("rule");

const saveStudents = (students) => saveJSONFile("students", students);
const saveStatuses = (statuses) => saveJSONFile("status", statuses);
const saveDepartments = (departments) => saveJSONFile("department", departments);
const savePrograms = (programs) => saveJSONFile("program", programs);

function isValidEmail(email) {
    const allowedDomains = loadJSONFile("domains").allowedDomains;
    if (!validator.isEmail(email)) return false;
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
}

function isValidPhone(phone) {
    const allowedCountries = loadJSONFile("countries").allowedCountries;
    return allowedCountries.some(countryCode => {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
        return phoneNumber && phoneNumber.country === countryCode;
    });
}

function isValidDepartment(department) {
    const validDepartments = loadDepartment();
    return validDepartments.some(s => s.Department === department);
}

function isValidStudentStatus(currentStatus, newStatus) {
    const validStatuses = loadStatus();
    if (!validStatuses.some(s => s.Status === newStatus)) return false;

    const transitions = {
        "Đang học": ["Tạm dừng học", "Đã tốt nghiệp", "Đã thôi học"],
        "Tạm dừng học": ["Đang học", "Đã thôi học"],
        "Đã tốt nghiệp": [],
        "Đã thôi học": []
    };

    return transitions[currentStatus]?.includes(newStatus) || false;
}

module.exports = {
    loadStudents, loadStatus, loadDepartment, loadProgram, loadRule,
    saveDepartments, saveStatuses, savePrograms, saveStudents,
    isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus
};
