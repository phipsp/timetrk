import { remote } from 'electron'
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

class Store {
    constructor(opts) {
        this.path = join(remote.app.getPath('userData'), opts.fileName + '.json');
        this.data = parseDataFile(this.path, opts.defaultData);
    }

    getProjects() {
        return this.data.projects;
    }

    saveProjects(data) {
        this.data.projects = data;
        writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaultData) {
    try {
        return JSON.parse(readFileSync(filePath));
    } catch (error) {
        console.warn('Couldnt open project data: ', filePath);
        console.info('Using default data: ', defaultData)
        return defaultData;
    }
}

export default Store;