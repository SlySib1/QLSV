const prompt = require("prompt-sync")();
const winston = require("winston");
const { addStudent, deleteStudent, updateStudent, searchStudent, searchStudentByDepartment, searchStudentByDepartmentAndName } = require("./student_manager");
const { addDepartment, renameDepartment, addStatus, renameStatus, addProgram, renameProgram } = require("./data_manage");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" })
    ]
});

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
        logger.info(`Người dùng chọn chức năng: ${choice}`);

        if (choice === "1") {
            logger.info("Thêm sinh viên");
            addStudent();
        } else if (choice === "2") {
            logger.info("Xóa sinh viên");
            deleteStudent();
        } else if (choice === "3") {
            logger.info("Cập nhật thông tin sinh viên");
            updateStudent();
        } else if (choice === "4") {
            logger.info("Tìm kiếm sinh viên theo tên hoặc MSSV");
            searchStudent();
        } else if (choice === "5") {
            logger.info("Thêm khoa mới");
            addDepartment();
        } else if (choice === "6") {
            logger.info("Đổi tên khoa");
            renameDepartment();
        } else if (choice === "7") {
            logger.info("Thêm trạng thái mới");
            addStatus();
        } else if (choice === "8") {
            logger.info("Đổi tên trạng thái");
            renameStatus();
        } else if (choice === "9") {
            logger.info("Thêm chương trình mới");
            addProgram();
        } else if (choice === "10") {
            logger.info("Đổi tên chương trình");
            renameProgram();
        } else if (choice === "11") {
            logger.info("Tìm kiếm sinh viên theo khoa");
            searchStudentByDepartment();
        } else if (choice === "12") {
            logger.info("Tìm kiếm sinh viên theo khoa và tên");
            searchStudentByDepartmentAndName();
        } else if (choice === "13") {
            logger.info("Người dùng thoát chương trình");
            console.log("Thoát chương trình!");
            break;
        } else {
            logger.warn("Người dùng nhập lựa chọn không hợp lệ");
            console.log("Lựa chọn không hợp lệ!");
        }
    }
}

main();