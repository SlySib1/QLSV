const fs = require("fs");
const prompt = require("prompt-sync")();
const { loadStudents, saveStudents, isValidEmail, isValidPhone,
    isValidDepartment, isValidStudentStatus } = require("./utils");
const { sendEmailToStudent } = require("./send_notification");
const path = require("path");

const STUDENT_FILE = path.join(__dirname, "../data", "students.json");

function addStudent() {
    const students = loadStudents();
    const mssv = prompt("Nhập MSSV: ").trim();

    if (students.some(s => s.MSSV === mssv)) {
        console.log("MSSV đã tồn tại!");
        return;
    }

    const name = prompt("Nhập họ tên: ").trim();
    const dob = prompt("Nhập ngày tháng năm sinh (DD/MM/YYYY): ").trim();
    const gender = prompt("Nhập giới tính (Nam/Nữ): ").trim();
    const email = prompt("Nhập email: ").trim();
    if (!isValidEmail(email)) {
        console.log("Email không hợp lệ!");
        return;
    }

    const phone = prompt("Nhập số điện thoại: ").trim();
    if (!isValidPhone(phone)) {
        console.log("Số điện thoại không hợp lệ!");
        return;
    }

    const department = prompt("Nhập khoa: ").trim();
    if (!isValidDepartment(department)) {
        console.log("Tên khoa không hợp lệ!");
        return;
    }

    const course = prompt("Nhập khóa: ").trim();
    const program = prompt("Nhập chương trình: ").trim();
    const address = prompt("Nhập địa chỉ: ").trim();
    const status = prompt("Nhập tình trạng sinh viên: ").trim();
    if (!isValidStudentStatus("", status)) {
        console.log("Tình trạng sinh viên không hợp lệ!");
        return;
    }

    const newStudent = {
        MSSV: mssv,
        Name: name,
        Dob: dob,
        Gender: gender,
        Email: email,
        Phone: phone,
        Department: department,
        Course: course,
        Program: program,
        Adress: address,
        Status: status
    };

    students.push(newStudent);
    saveStudents(students);
    console.log("Đã thêm sinh viên thành công!");
}

function deleteStudent() {
    const students = loadStudents();
    const mssv = prompt("Nhập MSSV cần xóa: ").trim();
    const updatedStudents = students.filter(s => s.MSSV !== mssv);

    if (students.length === updatedStudents.length) {
        console.log("Không tìm thấy sinh viên!");
    } else {
        saveStudents(updatedStudents);
        console.log("Xóa thành công!");
    }
}

function updateStudent() {
    const students = loadStudents();
    const mssv = prompt("Nhập MSSV cần cập nhật: ").trim();

    for (let s of students) {
        if (s.MSSV === mssv) {
            const oldData = s;
            console.log("Nếu muốn giữ nguyên thông tin hãy chỉ nhấn enter.");
            s.Name = prompt("Nhập họ tên mới: ").trim();
            if (!s.Name) {
                s.Name = oldData.Name;
                return;
            }
            s.Dob = prompt("Nhập ngày tháng năm sinh mới (DD/MM/YYYY): ").trim();
            if (!s.Dob) {
                s.Dob = oldData.Dob;
                return;
            }
            s.Gender = prompt("Nhập giới tính mới (Nam/Nữ): ").trim();
            if (!s.Gender) {
                s.Gender = oldData.Gender;
                return;
            }
            s.Email = prompt("Nhập email mới: ").trim();
            if (!s.Email) {
                s.Email = oldData.Email;
                return;
            } else
                if (!isValidEmail(s.Email)) {
                    console.log("Email không hợp lệ!");
                    return;
                }
            s.Phone = prompt("Nhập số điện thoại mới: ").trim();
            if (!s.Phone) {
                s.Phone = oldData.Phone;
                return;
            } else
                if (!isValidPhone(s.Phone)) {
                    console.log("Số điện thoại không hợp lệ!");
                    return;
                }
            s.Department = prompt("Nhập khoa mới: ").trim();
            if (!s.Department) {
                s.Department = oldData.Department;
                return;
            } else
                if (!isValidDepartment(s.Department)) {
                    console.log("Tên khoa không hợp lệ!");
                    return;
                }
            s.Corse = prompt("Nhập khóa mới: ").trim();
            if (!s.Corse) {
                s.Corse = oldData.Corse;
                return;
            }
            s.Program = prompt("Nhập chương trình mới: ").trim();
            if (!s.Program) {
                s.Program = oldData.Program;
                return;
            }
            s.Address = prompt("Nhập địa chỉ mới: ").trim();
            if (!s.Address) {
                s.Address = oldData.Address;
                return;
            }
            s.Status = prompt("Nhập tình trạng sinh viên mới: ").trim();
            if (!s.Status) {
                s.Status = oldData.Status;
                return;
            } else
                if (!isValidStudentStatus(oldData.Status, s.Status)) {
                    console.log("Tình trạng sinh viên không hợp lệ!");
                    return;
                }
            s.Status = newStatus;
            saveStudents(students);
            sendEmailToStudent(s, oldData);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy sinh viên!");
}

function searchStudent() {
    const students = loadStudents();
    const keyword = prompt("Nhập MSSV hoặc tên sinh viên: ").trim();
    const results = students.filter(s => s.MSSV.toLowerCase().includes(keyword)
        || s.Name === keyword);

    if (results.length > 0) {
        console.log("Kết quả tìm kiếm:");
        console.log(JSON.stringify(results, null, 4));
    } else {
        console.log("Không tìm thấy sinh viên!");
    }
}

function searchStudentByDepartment() {
    const students = loadStudents();
    const department = prompt("Nhập khoa cần tìm: ").trim();
    const results = students.filter(s => s.Department === department);

    if (results.length > 0) {
        console.log("Kết quả tìm kiếm:");
        console.log(JSON.stringify(results, null, 4));
    } else {
        console.log("Không tìm thấy sinh viên!");
    }
}

function searchStudentByDepartmentAndName() {
    const students = loadStudents();
    const department = prompt("Nhập Khoa cần tìm: ").trim();
    const name = prompt("Nhập tên sinh viên: ").trim();
    const results = students.filter(s => s.Department === department && s.Name === name);

    if (results.length > 0) {
        console.log("Kết quả tìm kiếm:");
        console.log(JSON.stringify(results, null, 4));
    } else {
        console.log("Không tìm thấy sinh viên!");
    }
}

module.exports = {
    addStudent, deleteStudent, updateStudent, searchStudent,
    searchStudentByDepartment, searchStudentByDepartmentAndName
};