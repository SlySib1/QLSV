const fs = require("fs");
const prompt = require("prompt-sync")();
const { loadDepartment } = require("./utils");
const path = require("path");

const DEPARTMENT_FILE = path.join(__dirname, "data", "department.json");

function saveDepartments(departments) {
    fs.writeFileSync(DEPARTMENT_FILE, JSON.stringify(departments, null, 4), "utf-8");
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

module.exports = { addDepartment, renameDepartment };