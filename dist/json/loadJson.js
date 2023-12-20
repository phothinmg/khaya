var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFileSync, promises as fs } from 'node:fs';
const { readFile } = fs;
const parse = (buffer, options = {}) => {
    let data = new TextDecoder().decode(buffer);
    if (typeof options.beforeParse === 'function') {
        data = options.beforeParse(data);
    }
    return JSON.parse(data, options.reviver);
};

export function loadJson(filePath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield readFile(filePath);
        return parse(buffer, options);
    });
}
export function loadJsonSync(filePath, options) {
    const buffer = readFileSync(filePath);
    return parse(buffer, options);
}
//# sourceMappingURL=loadJson.js.map