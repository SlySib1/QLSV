const fs = require("fs");
const { addStudent, deleteStudent, updateStudent, searchStudent, searchStudentByDepartment, searchStudentByDepartmentAndName } = require("../src/student_manage");
const { loadStudents, saveStudents, isValidEmail, isValidPhone, isValidDepartment, isValidStudentStatus } = require("../src/utils");

jest.mock("fs");

jest.mock("../src/utils", () => ({
    loadStudents: jest.fn(),
    saveStudents: jest.fn(),
    isValidEmail: jest.fn(),
    isValidPhone: jest.fn(),
    isValidDepartment: jest.fn(),
    isValidStudentStatus: jest.fn()
}));

jest.mock("prompt-sync", () => {
    const mockPrompt = jest.fn();
    return () => mockPrompt;
});
const mockPrompt = require("prompt-sync")();

describe("Student Management Tests", () => {
    let students;

    beforeEach(() => {
        jest.clearAllMocks();
        students = [
            { MSSV: "123", Name: "John Doe", Email: "john@example.com", Phone: "0123456789", Department: "IT", Status: "Active" },
            { MSSV: "456", Name: "Jane Doe", Email: "jane@example.com", Phone: "0987654321", Department: "Business", Status: "Inactive" }
        ];
        loadStudents.mockReturnValue(students);
    });

    test("addStudent() should add a student if valid", () => {
        mockPrompt.mockReturnValueOnce("789") // MSSV
            .mockReturnValueOnce("Alice") // Name
            .mockReturnValueOnce("01/01/2000") // Dob
            .mockReturnValueOnce("Nữ") // Gender
            .mockReturnValueOnce("alice@example.com") // Email
            .mockReturnValueOnce("0981111222") // Phone
            .mockReturnValueOnce("IT") // Department
            .mockReturnValueOnce("K20") // Course
            .mockReturnValueOnce("Computer Science") // Program
            .mockReturnValueOnce("123 Street") // Address
            .mockReturnValueOnce("Active"); // Status

        isValidEmail.mockReturnValue(true);
        isValidPhone.mockReturnValue(true);
        isValidDepartment.mockReturnValue(true);
        isValidStudentStatus.mockReturnValue(true);

        addStudent();

        expect(loadStudents).toHaveBeenCalled();
        expect(saveStudents).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ MSSV: "789", Name: "Alice" })
        ]));
    });

    test("deleteStudent() should remove a student if found", () => {
        mockPrompt.mockReturnValue("123");
        deleteStudent();
        expect(saveStudents).toHaveBeenCalledWith([students[1]]);
    });

    test("updateStudent() should modify student details", () => {
        mockPrompt.mockReturnValueOnce("123") // Find MSSV
            .mockReturnValueOnce("John Updated") // Name
            .mockReturnValueOnce("02/02/2000") // Dob
            .mockReturnValueOnce("Nam") // Gender
            .mockReturnValueOnce("updated@example.com") // Email
            .mockReturnValueOnce("0122223333") // Phone
            .mockReturnValueOnce("IT") // Department
            .mockReturnValueOnce("K21") // Course
            .mockReturnValueOnce("Software Engineering") // Program
            .mockReturnValueOnce("456 Avenue") // Address
            .mockReturnValueOnce("Active"); // Status

        isValidEmail.mockReturnValue(true);
        isValidPhone.mockReturnValue(true);
        isValidDepartment.mockReturnValue(true);
        isValidStudentStatus.mockReturnValue(true);

        updateStudent();

        expect(loadStudents).toHaveBeenCalled();
        expect(saveStudents).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ MSSV: "123", Name: "John Updated" })
        ]));
    });

    test("searchStudent() should return matching students (name)", () => {
        mockPrompt.mockReturnValue("John Doe");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        searchStudent();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("John Doe"));
    });

    test("searchStudent() should return matching students (ID)", () => {
        mockPrompt.mockReturnValue("123");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        searchStudent();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("John Doe"));
    });

    test("searchStudentByDepartment() should return students in department", () => {
        mockPrompt.mockReturnValue("IT");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        searchStudentByDepartment();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("John Doe"));
    });

    test("searchStudentByDepartmentAndName() should return specific student", () => {
        mockPrompt.mockReturnValueOnce("IT").mockReturnValueOnce("John Doe");
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        searchStudentByDepartmentAndName();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("John Doe"));
    });
});
