const fs = require("fs");
const prompt = require("prompt-sync")();
const { loadDepartment, loadStatus, loadProgram,
    saveDepartments, saveStatuses, savePrograms } = require("./utils");
const path = require("path");

const DEPARTMENT_FILE = path.join(__dirname, "../data", "department.json");
const STATUS_FILE = path.join(__dirname, "../data", "status.json");
const PROGRAM_FILE = path.join(__dirname, "../data", "program.json");

function addDepartment() {
    const departments = loadDepartment();

    const department = (prompt("Nhập tên của khoa mới: ") || "").trim();

    if (!department) {
        console.log("🚨 Không thêm department do tên trống");
        return;
    }

    const isDuplicate = departments.some(d => d.Department.toLowerCase() === department.toLowerCase());
    if (isDuplicate) {
        console.log("🚨 Khoa đã tồn tại, không thể thêm!");
        return;
    }

    const newDepartment = { Department: department };
    departments.push(newDepartment);
    saveDepartments(departments);
    console.log("Đã thêm khoa thành công!");
}

function renameDepartment() {
    const departments = loadDepartment();
    const lastDepartment = (prompt("Nhập tên cũ của khoa: ") || "").trim();

    for (let s of departments) {
        if (s.Department === lastDepartment) {
            s.Department = (prompt("Nhập tên mới của khoa: ") || "").trim();
            if (!s.Department) {
                console.log("🚨 Không thêm department do tên trống");
                return;
            }
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
    const lastStatus = prompt("Nhập trạng thái cũ: ").trim();

    for (let s of statuses) {
        if (s.Status === lastStatus) {
            s.Status = prompt("Nhập trạng thái mới: ").trim();
            saveStatuses(statuses);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy trạng thái!");
}

function addProgram() {
    const programs = loadProgram();
    const program = prompt("Nhập tên chương trình mới: ").trim();
    const newProgram = {
        Program: program
    };

    programs.push(newProgram);
    savePrograms(programs);
    console.log("Đã thêm chương trình mới thành công!");
}

function renameProgram() {
    const programs = loadProgram();
    const lastProgram = prompt("Nhập tên chương trình cũ: ").trim();

    for (let s of programs) {
        if (s.Program === lastProgram) {
            s.Program = prompt("Nhập tên chương trình mới: ").trim();
            savePrograms(programs);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy trạng thái!");
}

module.exports = {
    addDepartment, renameDepartment,
    addStatus, renameStatus,
    addProgram, renameProgram
};