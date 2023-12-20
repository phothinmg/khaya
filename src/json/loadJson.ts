import {readFileSync, promises as fs} from 'node:fs';
const {readFile} = fs;

const parse = (buffer: Buffer, options: {beforeParse?: (data: string) => string, reviver?: (key: any, value: any) => any} = {}): any => {
	let data = new TextDecoder().decode(buffer);

	if (typeof options.beforeParse === 'function') {
		data = options.beforeParse(data);
	}

	return JSON.parse(data, options.reviver);
};
// const parse = (buffer: Buffer, {beforeParse: any, reviver} = {}) => {
// 	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder` will remove BOM.
// 	let data = new TextDecoder().decode(buffer);

// 	if (typeof beforeParse === 'function') {
// 		data = beforeParse(data);
// 	}

// 	return JSON.parse(data, reviver);
// };

export async function loadJson(filePath: string, options?:any) {
	const buffer = await readFile(filePath);
	return parse(buffer, options);
}


export function loadJsonSync(filePath: string, options?: any) {
	const buffer = readFileSync(filePath);
	return parse(buffer, options);
}