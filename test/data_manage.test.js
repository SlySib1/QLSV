const fs = require("fs");
const { addDepartment } = require("../src/data_manage");
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
});
