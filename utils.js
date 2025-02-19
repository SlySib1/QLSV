function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidDepartment(department) {
    const validDepartments = ["Khoa Luật", "Khoa Tiếng Anh thương mại", "Khoa Tiếng Nhật", "Khoa Tiếng Pháp"];
    return validDepartments.includes(department);
}

function isValidStudentStatus(status) {
    const validStatuses = ["Đang học", "Đã tốt nghiệp", "Đã thôi học", "Tạm dừng học"];
    return validStatuses.includes(status);
}

module.exports = { isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus };
