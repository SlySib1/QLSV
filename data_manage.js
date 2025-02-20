const fs = require("fs");
const prompt = require("prompt-sync")();
const { loadDepartment, loadStatus } = require("./utils");
const path = require("path");

const DEPARTMENT_FILE = path.join(__dirname, "data", "department.json");
const STATUS_FILE = path.join(__dirname, "data", "status.json");

function saveDepartments(departments) {
    fs.writeFileSync(DEPARTMENT_FILE, JSON.stringify(departments, null, 4), "utf-8");
}

function saveStatuses(statuses) {
    fs.writeFileSync(STATUS_FILE, JSON.stringify(statuses, null, 4), "utf-8");
}

function addDepartment() {
    const departments = loadDepartment();
    const department = prompt("Nhập tên của khoa mới: ").trim();
    const newDepartment = {
        Department: department
    };

    departments.push(newDepartment);
    saveDepartments(departments);
    console.log("Đã thêm khoa thành công!");
}

function renameDepartment() {
    const departments = loadDepartment();
    const lastDepartment = prompt("Nhập tên cũ của khoa: ").trim();

    for (let s of departments) {
        if (s.Department === lastDepartment) {
            s.Department = prompt("Nhập tên mới của khoa: ").trim();
            saveDepartments(departments);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy khoa!");
}

function addStatus() {
    const statuses = loadStatus();
    const status = prompt("Nhập trạng thái mới: ").trim();
    const newStatus = {
        Status: status
    };

    statuses.push(newStatus);
    saveStatuses(statuses);
    console.log("Đã thêm trạng thái thành công!");
}

function renameStatus() {
    const statuses = loadStatus();
    const laststatus = prompt("Nhập trạng thái cũ: ").trim();

    for (let s of statuses) {
        if (s.Status === laststatus) {
            s.Status = prompt("Nhập trạng thái mới: ").trim();
            saveStatuses(statuses);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy trạng thái!");
}

module.exports = { addDepartment, renameDepartment, addStatus, renameStatus };