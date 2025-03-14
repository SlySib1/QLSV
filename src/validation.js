const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const { readJSONFile } = require("./fileUtils");

const ALLOWED_DOMAINS_FILE = "./data/domain.json";
const ALLOWED_COUNTRIES_FILE = "./data/countries.json";
const DEPARTMENT_FILE = "./data/department.json";
const STATUS_FILE = "./data/status.json";

function isValidEmail(email) {
    const allowedDomains = readJSONFile(ALLOWED_DOMAINS_FILE).allowedDomains;
    if (!validator.isEmail(email)) return false;
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
}

function isValidPhone(phone) {
    const allowedCountries = readJSONFile(ALLOWED_COUNTRIES_FILE).allowedCountries;
    return allowedCountries.some(countryCode => {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
        return phoneNumber && phoneNumber.country === countryCode;
    });
}

function isValidDepartment(department) {
    const validDepartments = readJSONFile(DEPARTMENT_FILE);
    return validDepartments.some(s => s.Department === department);
}

function isValidStudentStatus(currentStatus, newStatus) {
    const validStatuses = readJSONFile(STATUS_FILE);
    if (!validStatuses.some(s => s.Status === newStatus)) return false;

    const transitions = {
        "Đang học": ["Tạm dừng học", "Đã tốt nghiệp", "Đã thôi học"],
        "Tạm dừng học": ["Đang học", "Đã thôi học"],
        "Đã tốt nghiệp": [],
        "Đã thôi học": []
    };

    return transitions[currentStatus]?.includes(newStatus) || false;
}

module.exports = { isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus };
