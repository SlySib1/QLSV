const fs = require("fs");
const prompt = require("prompt-sync")();
const { isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus } = require("./utils");

const STUDENT_FILE = "students.json";

function loadStudents() {
    try {
        const data = fs.readFileSync(STUDENT_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveStudents(students) {
    fs.writeFileSync(STUDENT_FILE, JSON.stringify(students, null, 4), "utf-8");
}

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
    if (!isValidStudentStatus(status)) {
        console.log("Tình trạng sinh viên không hợp lệ!");
        return;
    }

    const newStudent = {
        MSSV: mssv,
        "Họ tên": name,
        "Ngày sinh": dob,
        "Giới tính": gender,
        Email: email,
        "Số điện thoại": phone,
        "Khoa": department,
        "Khóa": course,
        "Chương trình": program,
        "Địa chỉ": address,
        "Tình trạng sinh viên": status
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
            s["Họ tên"] = prompt("Nhập họ tên mới: ").trim();
            s["Ngày sinh"] = prompt("Nhập ngày tháng năm sinh mới (DD/MM/YYYY): ").trim();
            s["Giới tính"] = prompt("Nhập giới tính mới (Nam/Nữ): ").trim();
            s.Email = prompt("Nhập email mới: ").trim();
            if (!isValidEmail(s.Email)) {
                console.log("Email không hợp lệ!");
                return;
            }
            s["Số điện thoại"] = prompt("Nhập số điện thoại mới: ").trim();
            if (!isValidPhone(s["Số điện thoại"])) {
                console.log("Số điện thoại không hợp lệ!");
                return;
            }
            s["Khoa"] = prompt("Nhập khoa mới: ").trim();
            if (!isValidDepartment(s["Khoa"])) {
                console.log("Tên khoa không hợp lệ!");
                return;
            }
            s["Khóa"] = prompt("Nhập khóa mới: ").trim();
            s["Chương trình"] = prompt("Nhập chương trình mới: ").trim();
            s["Địa chỉ"] = prompt("Nhập địa chỉ mới: ").trim();
            s["Tình trạng sinh viên"] = prompt("Nhập tình trạng sinh viên mới: ").trim();
            if (!isValidStudentStatus(s["Tình trạng sinh viên"])) {
                console.log("Tình trạng sinh viên không hợp lệ!");
                return;
            }
            saveStudents(students);
            console.log("Cập nhật thành công!");
            return;
        }
    }
    console.log("Không tìm thấy sinh viên!");
}

function searchStudent() {
    const students = loadStudents();
    const keyword = prompt("Nhập MSSV hoặc tên sinh viên: ").trim().toLowerCase();
    const results = students.filter(s => s.MSSV.toLowerCase().includes(keyword) || s["Họ tên"].toLowerCase().includes(keyword));

    if (results.length > 0) {
        console.log("Kết quả tìm kiếm:");
        console.log(JSON.stringify(results, null, 4));
    } else {
        console.log("Không tìm thấy sinh viên!");
    }
}

module.exports = { addStudent, deleteStudent, updateStudent, searchStudent };