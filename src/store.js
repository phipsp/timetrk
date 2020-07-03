import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';

class Store {
    constructor(opts) {
        this.path = join("~/Library/Application Support/timetrk/", opts.fileName + '.json'); //TODO: Find a way to get path from electron

        this.data = parseDataFile(this.path, opts.defaultData);
    }

    getProjects() {
        return this.data;
    }

    saveProjects(data) {
        this.data = data;
        writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath,
    defaultData) {
    try {
        return JSON.parse(readFileSync(filePath));
    } catch (error) {
        console.log("Couldnt open project data: ", filePath);
        return defaultData;
    }
}

export default Store;