import { remote } from 'electron'
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

class Store {
    constructor(opts) {
        this.path = join(
            remote.app.getPath('userData'),
            opts.fileName + '.json'); // TODO: Find a way to get path from electron
        this.data = parseDataFile(this.path, opts.defaultData);
    }

    getProjects() {
        return this.data.projects;
    }

    saveProjects(data) {
        this.data.projects = data;
        writeFileSync(this.path, JSON.stringify(this.data));
        console.log('Projects saved');
    }
}

function parseDataFile(filePath, defaultData) {
    try {
        return JSON.parse(readFileSync(filePath));
    } catch (error) {
        console.log('Couldnt open project data: ', filePath);
        return defaultData;
    }
}

export default Store;