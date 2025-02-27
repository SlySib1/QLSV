const fs = require("fs");
const { addDepartment, renameDepartment,
    addStatus, renameStatus,
    addProgram, renameProgram } = require("../src/data_manage");
const { loadDepartment, saveDepartments } = require("../src/utils");

jest.mock("fs");

jest.mock("prompt-sync", () => {
    const mockPrompt = jest.fn();
    return () => mockPrompt;
});
const prompt = require("prompt-sync")();

const mockPrompt = prompt;

jest.mock("../src/utils", () => ({
    loadDepartment: jest.fn(),
    saveDepartments: jest.fn(),
}));

describe("Testing department functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("addDepartment() should add a new department and save to file", () => {

        mockPrompt.mockReturnValue("New Department");
        loadDepartment.mockReturnValue([]);

        addDepartment();
        expect(loadDepartment).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên của khoa mới: ");
        expect(saveDepartments).toHaveBeenCalled();
        expect(saveDepartments).toHaveBeenCalledWith([{ Department: "New Department" }]);
        console.log("🔥 Data saved:", saveDepartments.mock.calls); // Debug
    });
    test("addDepartment() should not save an empty department", () => {
        mockPrompt.mockReturnValueOnce("");
        loadDepartment.mockReturnValue([]);
        addDepartment();
        expect(saveDepartments).not.toHaveBeenCalled();
    });
    test("addDepartment() should call saveDepartments at most once", () => {
        loadDepartment.mockReturnValue([]);
        mockPrompt.mockReturnValue("IT Department");

        addDepartment();
        addDepartment();

        expect(saveDepartments).toHaveBeenCalled(); // Đảm bảo đã được gọi
        expect(saveDepartments).toHaveBeenCalledTimes(1); // Chỉ gọi đúng 1 lần
    });
});

describe("Testing renameDepartment function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renameDepartment() should rename an existing department and save", () => {
        mockPrompt.mockReturnValueOnce("Old Department").mockReturnValueOnce("New Department");

        loadDepartment.mockReturnValue([{ Department: "Old Department" }]);

        renameDepartment();

        expect(loadDepartment).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên cũ của khoa: ");
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên mới của khoa: ");
        expect(saveDepartments).toHaveBeenCalledWith([{ Department: "New Department" }]);
    });

    test("renameDepartment() should not rename if department does not exist", () => {
        mockPrompt.mockReturnValue("Nonexistent Department");

        loadDepartment.mockReturnValue([{ Department: "Existing Department" }]);

        renameDepartment();

        expect(loadDepartment).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(1);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên cũ của khoa: ");
        expect(saveDepartments).not.toHaveBeenCalled();
    });

    test("renameDepartment() should not rename if new name is empty", () => {
        mockPrompt.mockReturnValueOnce("Old Department").mockReturnValueOnce("");

        loadDepartment.mockReturnValue([{ Department: "Old Department" }]);

        renameDepartment();

        expect(loadDepartment).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(saveDepartments).not.toHaveBeenCalled();
    });
});