const path = require("path");
const { readJSONFile, writeJSONFile } = require("./fileUtils");
const { isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus } = require("./validation");

const STUDENT_FILE = path.join(__dirname, "../data", "students.json");
const STATUS_FILE = path.join(__dirname, "../data", "status.json");
const DEPARTMENT_FILE = path.join(__dirname, "../data", "department.json");
const PROGRAM_FILE = path.join(__dirname, "../data", "program.json");
const RULE_FILE = path.join(__dirname, "../data", "rule.json");

const loadStudents = () => readJSONFile(STUDENT_FILE);
const loadStatus = () => readJSONFile(STATUS_FILE);
const loadDepartment = () => readJSONFile(DEPARTMENT_FILE);
const loadProgram = () => readJSONFile(PROGRAM_FILE);
const loadRule = () => readJSONFile(RULE_FILE);

const saveStudents = (students) => writeJSONFile(STUDENT_FILE, students);
const saveStatuses = (statuses) => writeJSONFile(STATUS_FILE, statuses);
const saveDepartments = (departments) => writeJSONFile(DEPARTMENT_FILE, departments);
const savePrograms = (programs) => writeJSONFile(PROGRAM_FILE, programs);

module.exports = {
    loadStudents, loadStatus, loadDepartment, loadProgram, loadRule,
    saveStudents, saveStatuses, saveDepartments, savePrograms,
    isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus
};
