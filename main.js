const prompt = require("prompt-sync")();
const { addStudent, deleteStudent, updateStudent, searchStudent, searchStudentByDepartment, searchStudentByDepartmentAndName } = require("./student_manager");
const { addDepartment, renameDepartment, addStatus, renameStatus, addProgram, renameProgram } = require("./data_manage");

function main() {
    while (true) {
        console.log("\n===== QUẢN LÝ SINH VIÊN =====");
        console.log("1. Thêm sinh viên");
        console.log("2. Xóa sinh viên");
        console.log("3. Cập nhật thông tin sinh viên");
        console.log("4. Tìm kiếm sinh viên (theo tên hoặc MSSV)");
        console.log("5. Thêm khoa mới");
        console.log("6. Đổi tên khoa");
        console.log("7. Thêm trạng thái mới");
        console.log("8. Đổi tên trạng thái");
        console.log("9. Thêm chương trình mới");
        console.log("10. Đổi tên chương trình");
        console.log("11. Tìm kiếm sinh viên (theo khoa)");
        console.log("12. Tìm kiếm sinh viên (theo khoa và tên)");
        console.log("13. Thoát");

        const choice = prompt("Chọn chức năng: ").trim();

        if (choice === "1") {
            addStudent();
        } else if (choice === "2") {
            deleteStudent();
        } else if (choice === "3") {
            updateStudent();
        } else if (choice === "4") {
            searchStudent();
        } else if (choice === "5") {
            addDepartment();
        } else if (choice === "6") {
            renameDepartment();
        } else if (choice === "7") {
            addStatus();
        } else if (choice === "8") {
            renameStatus();
        } else if (choice === "9") {
            addProgram();
        } else if (choice === "10") {
            renameProgram();
        } else if (choice === "11") {
            searchStudentByDepartment();
        } else if (choice === "12") {
            searchStudentByDepartmentAndName();
        } else if (choice === "13") {
            console.log("Thoát chương trình!");
            break;
        } else {
            console.log("Lựa chọn không hợp lệ!");
        }
    }
}

main();
