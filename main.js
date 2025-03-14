const prompt = require("prompt-sync")();
const winston = require("winston");
const fs = require("fs");
const { execSync } = require("child_process");
const { addStudent, deleteStudent, updateStudent, searchStudent, searchStudentByDepartment, searchStudentByDepartmentAndName } = require("./src/student_manage");
const { addDepartment, renameDepartment, addStatus, renameStatus, addProgram, renameProgram, changeRule } = require("./src/data_manage");
const { loadRule } = require("./src/utils");
const { sendNotification } = require("./src/send_notification");

function getGitVersion() {
    try {
        return execSync("git describe --tags --abbrev=0").toString().trim();
    } catch (error) {
        console.warn("⚠ Không tìm thấy Git tag, thử lấy phiên bản theo cách khác...");
        try {
            return execSync("git tag --sort=-creatordate | head -n 1").toString().trim();
        } catch (error2) {
            console.warn("⚠ Không tìm thấy Git tag theo cách khác, thử lấy từ package.json...");
            try {
                const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
                return packageJson.version || "Unknown";
            } catch (error3) {
                return "Unknown";
            }
        }
    }
}

function generateBuildInfo() {
    const buildInfoPath = "./build-info.json";
    const version = getGitVersion();
    const buildDate = new Date().toISOString();

    const newBuildInfo = { version, buildDate };
    fs.writeFileSync(buildInfoPath, JSON.stringify(newBuildInfo, null, 2), { flag: 'w' });

    console.log(`✅ Cập nhật build-info.json:`, newBuildInfo);
    return newBuildInfo;
}

const { version: APP_VERSION, buildDate: BUILD_DATE } = generateBuildInfo();

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
    console.log(`\n📌 Ứng dụng Quản lý Sinh Viên`);
    console.log(`🆙 Version: ${APP_VERSION} | 📅 Build Date: ${BUILD_DATE}`);

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
        if (loadRule()) console.log("13. Tắt việc áp dụng quy định");
        else consone.log("13. Bật việc áp dụng quy định");
        console.log("14. Thoát");

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
            logger.info("Thay đổi việc áp dụng quy định");
            changeRule();
        } else if (choice === "14") {
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