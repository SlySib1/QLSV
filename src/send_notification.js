const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const logger = require("./logger");
require("dotenv").config();

// Cấu hình Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Hàm gửi email
function sendEmail(to, subject, text) {
    transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text })
        .then(() => logger.info(`Đã gửi email đến ${to}`))
        .catch(error => logger.error(`Lỗi gửi email: ${error.message}`));
}

function sendEmailToStudent(student, oldData) {
    const changes = [];
    for (const key in student) {
        if (student[key] !== oldData[key]) {
            changes.push(`${key}: ${oldData[key]} -> ${student[key]}`);
        }
    }

    if (changes.length > 0) {
        console.log(changes.length);
        console.log(changes);
        const message = `Thông tin của bạn đã được cập nhật:\n${changes.join("\n")}`;
        sendEmail(student.Email, "Cập nhật thông tin sinh viên", message);
    }
}

module.exports = { sendEmailToStudent };
