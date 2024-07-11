const {log}             = require("nodemon/lib/utils");
const Content           = require("../models/content.js");
const config             = require("config");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

class resaveZip {
    constructor(resaveZip) {
        this.resaveZip = resaveZip;
    }
    resaveZipInNew(path) {
        const n = path.split("/").length
        if (n === 11){
            const AdmZip = require('adm-zip');
			// Создайте объект архива
            const zip = new AdmZip();
			// Добавить каталог в архив
            zip.addLocalFolder(path);
			// Сохранить архив
            zip.writeZip(path+".zip", true)
            console.log("архив пересобран")
        }
    }
}

module.exports = resaveZip;