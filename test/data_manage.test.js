const fs = require("fs");
const { addDepartment, renameDepartment,
    addStatus, renameStatus,
    addProgram, renameProgram,
} = require("../src/data_manage");
const { loadDepartment, saveDepartments,
    loadProgram, savePrograms,
    loadStatus, saveStatuses
} = require("../src/utils");

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
    loadProgram: jest.fn(),
    savePrograms: jest.fn(),
    loadStatus: jest.fn(),
    saveStatuses: jest.fn(),
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

describe("Testing addProgram function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("addProgram() should add a new program and save to file", () => {
        mockPrompt.mockReturnValue("New Program");
        loadProgram.mockReturnValue([]);

        addProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên chương trình mới: ");
        expect(savePrograms).toHaveBeenCalledWith([{ Program: "New Program" }]);
    });

    test("addProgram() should not add an empty program", () => {
        mockPrompt.mockReturnValue("");
        loadProgram.mockReturnValue([]);

        addProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(savePrograms).not.toHaveBeenCalled();
    });

    test("addProgram() should not add a duplicate program", () => {
        mockPrompt.mockReturnValue("Existing Program");
        loadProgram.mockReturnValue([{ Program: "Existing Program" }]);

        addProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(savePrograms).not.toHaveBeenCalled();
    });
});

describe("Testing renameProgram function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renameProgram() should rename an existing program and save", () => {
        mockPrompt.mockReturnValueOnce("Old Program").mockReturnValueOnce("New Program");

        loadProgram.mockReturnValue([{ Program: "Old Program" }]);

        renameProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên chương trình cũ: ");
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên chương trình mới: ");
        expect(savePrograms).toHaveBeenCalledWith([{ Program: "New Program" }]);
    });

    test("renameProgram() should not rename if program does not exist", () => {
        mockPrompt.mockReturnValue("Nonexistent Program");

        loadProgram.mockReturnValue([{ Program: "Existing Program" }]);

        renameProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(1);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập tên chương trình cũ: ");
        expect(savePrograms).not.toHaveBeenCalled();
    });

    test("renameProgram() should not rename if new name is empty", () => {
        mockPrompt.mockReturnValueOnce("Old Program").mockReturnValueOnce("");

        loadProgram.mockReturnValue([{ Program: "Old Program" }]);

        renameProgram();

        expect(loadProgram).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(savePrograms).not.toHaveBeenCalled();
    });
});

describe("Testing addStatus function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("addStatus() should add a new status and save to file", () => {
        mockPrompt.mockReturnValue("New Status");
        loadStatus.mockReturnValue([]);

        addStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledWith("Nhập trạng thái mới: ");
        expect(saveStatuses).toHaveBeenCalledWith([{ Status: "New Status" }]);
    });

    test("addStatus() should not add an empty status", () => {
        mockPrompt.mockReturnValue("");
        loadStatus.mockReturnValue([]);

        addStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(saveStatuses).not.toHaveBeenCalled();
    });

    test("addStatus() should not add a duplicate status", () => {
        mockPrompt.mockReturnValue("Existing Status");
        loadStatus.mockReturnValue([{ Status: "Existing Status" }]);

        addStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(saveStatuses).not.toHaveBeenCalled();
    });
});

describe("Testing renameStatus function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renameStatus() should rename an existing status and save", () => {
        mockPrompt.mockReturnValueOnce("Old Status").mockReturnValueOnce("New Status");

        loadStatus.mockReturnValue([{ Status: "Old Status" }]);

        renameStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập trạng thái cũ: ");
        expect(mockPrompt).toHaveBeenCalledWith("Nhập trạng thái mới: ");
        expect(saveStatuses).toHaveBeenCalledWith([{ Status: "New Status" }]);
    });

    test("renameStatus() should not rename if status does not exist", () => {
        mockPrompt.mockReturnValue("Nonexistent Status");

        loadStatus.mockReturnValue([{ Status: "Existing Status" }]);

        renameStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(1);
        expect(mockPrompt).toHaveBeenCalledWith("Nhập trạng thái cũ: ");
        expect(saveStatuses).not.toHaveBeenCalled();
    });

    test("renameStatus() should not rename if new name is empty", () => {
        mockPrompt.mockReturnValueOnce("Old Status").mockReturnValueOnce("");

        loadStatus.mockReturnValue([{ Status: "Old Status" }]);

        renameStatus();

        expect(loadStatus).toHaveBeenCalled();
        expect(mockPrompt).toHaveBeenCalledTimes(2);
        expect(saveStatuses).not.toHaveBeenCalled();
    });
});