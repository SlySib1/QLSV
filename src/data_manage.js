const fs = require("fs");
const prompt = require("prompt-sync")();
const {
    loadDepartment, loadStatus, loadProgram, loadRule,
    saveDepartments, saveStatuses, savePrograms
} = require("./utils");

function addEntity(loadFunc, saveFunc, entityName, keyName) {
    console.log("Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM");
    const entities = loadFunc();
    const rule = loadRule();

    const newValue = (prompt(`Nhập tên ${entityName} mới: `) || "").trim();
    if (!newValue) {
        console.log(`🚨 Không thêm ${entityName} do tên trống`);
        return;
    }

    if (rule && entities.some(e => e[keyName].toLowerCase() === newValue.toLowerCase())) {
        console.log(`🚨 ${entityName} đã tồn tại, không thể thêm!`);
        return;
    }

    entities.push({ [keyName]: newValue });
    saveFunc(entities);
    console.log(`Đã thêm ${entityName} thành công!`);
}

function renameEntity(loadFunc, saveFunc, entityName, keyName) {
    console.log("Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM");
    const entities = loadFunc();
    const rule = loadRule();

    const oldValue = (prompt(`Nhập tên cũ của ${entityName}: `) || "").trim();
    const entity = entities.find(e => e[keyName] === oldValue);

    if (!entity) {
        console.log(`🚨 Không tìm thấy ${entityName}!`);
        return;
    }

    const newValue = (prompt(`Nhập tên mới của ${entityName}: `) || "").trim();
    if (!newValue) {
        console.log(`🚨 Không đổi tên ${entityName} do tên trống`);
        return;
    }

    if (rule && entities.some(e => e[keyName].toLowerCase() === newValue.toLowerCase())) {
        console.log(`🚨 ${entityName} đã tồn tại, không thể đổi tên thành!`);
        return;
    }

    entity[keyName] = newValue;
    saveFunc(entities);
    console.log(`Cập nhật ${entityName} thành công!`);
}

function changeRule() {
    console.log("Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM");
    let rules = loadRule();

    if (!rules || rules.length === 0) {
        console.log("🚨 Không tìm thấy quy tắc nào trong file!");
        return;
    }

    rules[0].rulesEnabled = !rules[0].rulesEnabled;
    fs.writeFileSync("./data/rule.json", JSON.stringify(rules, null, 4), "utf-8");
    console.log(`✅ Quy tắc đã đổi thành: ${rules[0].rulesEnabled}`);
}

const addDepartment = () => addEntity(loadDepartment, saveDepartments, "Khoa", "Department");
const renameDepartment = () => renameEntity(loadDepartment, saveDepartments, "Khoa", "Department");

const addStatus = () => addEntity(loadStatus, saveStatuses, "Trạng thái", "Status");
const renameStatus = () => renameEntity(loadStatus, saveStatuses, "Trạng thái", "Status");

const addProgram = () => addEntity(loadProgram, savePrograms, "Chương trình", "Program");
const renameProgram = () => renameEntity(loadProgram, savePrograms, "Chương trình", "Program");

module.exports = {
    addDepartment, renameDepartment,
    addStatus, renameStatus, changeRule,
    addProgram, renameProgram
};