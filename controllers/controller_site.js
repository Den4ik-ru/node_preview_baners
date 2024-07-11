const config    = require("config");
const fs = require("fs");
const AdmZip = require("adm-zip");
const path = require('path');
const ResaveZip = require("../components/resaveZip.js");
const Auth           = require("../components/auth.js");


require('dotenv').config();
module.exports.index = async (req, res) => {
    res.redirect("/"+atob(req.query.has))
}

module.exports.adbloc = async (req, res) => {
    res.send("")
}

module.exports.upload = async (req, res) =>  {
    function raspakovksZIP(path) {
        // Получить список файлов и папок в указанном пути
        fs.readdir(path, (err, files) => {
            // Удалить все файлы в папке
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = `${path}/${file}`;
                try {
                    // Если это файл
                    if (fs.lstatSync(filePath).isFile()) {
                        try {
                            var zip = new AdmZip(filePath)
                            stPath= filePath.split(".zip")[0]
                            // newPath= stPath.replace('/b/', '/o/')
                            zip.extractAllTo(stPath, true)
                        } catch (err) {}
                    }
                    else if (fs.lstatSync(filePath).isDirectory()) {
                        raspakovksZIP(filePath);
                    }
                } catch {console.log("распаковка")}
            }
            // После удаления всех файлов и папок удалить саму папку
            fs.rmdir(path, (err) => {
                if (err) {
                    console.error('Ошибка распаковки папки:', err);
                    return null;
                }
            });
        });
    }
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        fs.rename('uploads/'+filedata.filename, req.query.href+"/"+filedata.originalname, err => {
            if (err) throw err; // не удалось переименовать файл
            console.log('Файл успешно переименован');
            if (filedata.originalname.split(".zi")[1]){
                var AdmZip = require("adm-zip");
                let path = req.query.href + "/" + filedata.originalname
                var zip = new AdmZip(path);
                stPath = req.query.href
                folder_name = filedata.originalname.split(".zi")[0]
                zip.extractAllTo('./' + stPath +"/"+folder_name, true); // an array of ZipEntry records
                try {
                    raspakovksZIP('./' + stPath+"/"+folder_name)
                } catch {console.log("raspakov")}
                setTimeout(() => {
                    try {
                        ssss = req.url.split("/")
                        if (ssss.length < 11) {
                            fs.unlink(req.query.href + "/" + filedata.originalname, (err) => {
                                if (err) {
                                    return null;
                                }
                            });
                        }else {

                        }
                    } catch (err) {console.log("удаление")}
                }, 300);
            }else{
                const resaveZip = new ResaveZip();
                resaveZip.resaveZipInNew(req.query.href)
            }
        });
    setTimeout(() => {
        res.redirect('back')
    }, 2000);
}

module.exports.addyaer = async (req, res) =>  {
    let filedata = req.file;
    console.log(filedata);
    const date = new Date();
    const currentDate = `${date.getMilliseconds().toString()}`;
    let nam = "/"+currentDate.toString();
    fs.mkdir(req.query.href+nam, err => {
        if(err) throw err; // не удалось создать папку
        console.log('Папка успешно создана');
        res.redirect('back')
    });
}

module.exports.openyaer = async (req, res) => {
    function deleteFile(path) {
        try {
            fs.unlink(path, (err) => {
                if (err) {
                    // console.error(`Ошибка при удалении файла ${path}:`, err);
                }
            });
        }catch {
            console.log("удаление")
        }

    }
    function deleteFolder(path) {

        // Получить список файлов и папок в указанном пути
        fs.readdir(path, (err, files) => {
            if (err) {
                // console.error('Ошибка при чтении папки:', err);
                return;
            }

            // Удалить все файлы в папке
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = `${path}/${file}`;
                try {
                    // Если это файл, удалить его
                    if (fs.lstatSync(filePath).isFile()) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                // console.error(`Ошибка при удалении файла ${file}:`, err);
                                return null;
                            }
                        });
                    }
                    // Если это папка, рекурсивно удалить ее
                    else if (fs.lstatSync(filePath).isDirectory()) {
                        deleteFolder(filePath);
                    }
                }catch {
                    console.log("удаление")
                }
            }
            // После удаления всех файлов и папок удалить саму папку
            fs.rmdir(path, (err) => {
                if (err) {
                    // console.error('Ошибка при удалении папки:', err);
                    return null;
                }
            });
        });
    }

    const auth = new Auth();
    s = auth.chekCookie(req, res)
    let cookie = s

    let admin = 0
    if (s==="ytrewq" || s==="hgfdsa"){
        //админ
        console.log('admin'+s);

        if (req.url.indexOf("admin=") !== -1) {
            res.redirect(req.url.split("admin=")[0])
            return
        }
        admin = 1
    }else {
        if (s.length < 1){
            res.render("year/auth.twig")
            return
        }
        //гость
        if (req.url.indexOf(s) !== -1) {
            console.log('Подстрока найдена!');
            if (req.url.indexOf("&has=") !== -1) {
                res.redirect(req.url.split("&has=")[0])
                return
            }

        }else {
            if (req.url.indexOf("admin=") !== -1) {
                res.redirect(req.url.split("admin=")[0])
                return
            }
            res.render("year/auth.twig")
            // res.send("Нет доступа к каталогу")
            return
        }
    }
    const fs = require("fs");
    const path = require('path');


    async function getParseSizeMeta(pathHtml){
        try {
            const html = fs.readFileSync(pathHtml, 'utf-8');
            s = html.split('<meta name="ad.size" content="')[1].split('">')[0]
            return s
        }catch{
            return "0"
        }
    }
    async function getParseTegTitel(pathHtml){
        try {
            const html = fs.readFileSync(pathHtml, 'utf-8');
            s = html.split('title>')[1].split('</title')[0]
            return s
        }catch{}
    }
    //
    function findIndexHtmlPaths(dir) {
        // список путей к файлам index.html
        const paths = []
        // рекурсивная функция для поиска файлов index.html
        function walk(dir) {
            // получить список файлов и каталогов в текущем каталоге
            const files = fs.readdirSync(dir);

            // перебрать все файлы и каталоги
            for (const file of files) {
                // получить полный путь к файлу или каталогу
                const filePath = path.join(dir, file);
                // если это файл и его имя index.html, добавить его в список путей
                if (fs.statSync(filePath).isFile() && file === 'index.html') {
                    if (paths.length < 50){
                        paths.push(filePath);
                    }else{
                        if (paths.length === 50) {
                            paths.push("Есть еще");
                            break
                        }
                    }
                } else if (fs.statSync(filePath).isDirectory()) {
                    if (paths.length < 50) {
                        // если это каталог, рекурсивно вызвать функцию walk для этого каталога
                        walk(filePath);
                    }
                }
            }
        }
        // запустить рекурсивный поиск из заданного каталога
        walk(dir);
        // вернуть список путей к файлам index.html
        return paths;
    }

    const x = []
    let god = ""
    let god1 = ""
    let endCatalog = "openyaer"
    let vidimost = 0
    if (req.query.god !== undefined) {
        god = req.query.god
        god1 = "/" + god
        endCatalog = "god="+god
        if (endCatalog === cookie) {
            vidimost = 1
        }

    }
    let mes = ""
    let mes1 = ""
    if (req.query.mes !== undefined) {
        mes = req.query.mes
        mes1 = "/" + mes
        endCatalog = "mes="+mes
        if (endCatalog === cookie) {
            vidimost = 2
        }
    }
    let com = ""
    let com1 = ""
    if (req.query.com !== undefined) {
        com = req.query.com
        com1 = "/" + com
        endCatalog = "com="+com
        if (endCatalog === cookie) {
            vidimost = 3
        }
    }
    let val = ""
    let val1 = ""
    if (req.query.val !== undefined) {
        val = req.query.val
        val1 = "/" + val
        endCatalog = "val="+val
        if (endCatalog === cookie) {
            vidimost = 4
        }
    }
    let tov = ""
    let tov1 = ""
    if (req.query.tov !== undefined) {
        tov = req.query.tov
        tov1 = "/" + tov
        endCatalog = "tov="+tov
        if (endCatalog === cookie) {
            vidimost = 5
        }
    }
    let plo = ""
    let plo1 = ""
    if (req.query.plo !== undefined) {
        plo = req.query.plo
        plo1 = "/" + plo
        endCatalog = "plo="+plo
        if (endCatalog === cookie) {
            vidimost = 6
        }
    }
    let ban = ""
    let ban1 = ""
    if (req.query.ban !== undefined) {
        ban = req.query.ban
        ban1 = "/" + ban
        endCatalog = "ban="+ban
        if (endCatalog === cookie) {
            vidimost = 7
        }
    }
    let I = ""
    if (req.query.I !== undefined) {
        I = req.query.I
    }else{
        I = "0"
    }
    let paths = '../start/public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1
    poiscBaners = []
    try{
        poiscBaners = findIndexHtmlPaths(paths);
    } catch {
        poiscBaners = []
        console.log("ошибка получения")
    }

    const poisc = []
    let has = ""
    const poiscBanersName = []
    let ii = 0
    let pyt = ''
    if (poiscBaners.length>0) {
        for (s in poiscBaners) {
            const bans = poiscBaners[s].split("\\")
            poisc.push(bans)
            poiscBanersName.push(bans[10])
            const strr = 'b/' + bans[4] + '/' + bans[5] + '/' + bans[6] + '/' + bans[7] + '/' + bans[8] + '/' + bans[9] + '/' + bans[10]//bans[10]
            try {
                sss = btoa(strr)
            } catch {
                console.log("ошибка кодирования", strr)
            }

            if (ii.toString() === I) {
                pyt = strr
                has = btoa(strr) //создать has
            }
            ii = ii + 1
        }
    }
    let pytt = "public/"+pyt+"/index.html"
    const SizeMeta = []
    let strr = await getParseSizeMeta(pytt)
    try {
        SizeMeta['strok'] = await strr
        SizeMeta['width'] = await strr.split("width=")[1].split(",")[0]
        SizeMeta['height'] = await strr.split("height=")[1].split(",")[0]
        SizeMeta['len'] = await strr.length

        if (SizeMeta['width'].includes('%')) {
            SizeMeta['width'] = 700
            SizeMeta['resize'] = "resize: horizontal;"
            if (SizeMeta['height'].includes('%')) {
                SizeMeta['resize'] = "resize: both;"
                SizeMeta['height'] = 700
            }
        } else {
            if (SizeMeta['height'].includes('%')) {
                SizeMeta['resize'] = "resize: vertical;"
                SizeMeta['height'] = 700
            }
        }
    }catch {}

    const tegTitel = await getParseTegTitel(pytt)
    let pyttt = "public/"+pyt+".zip"

    let sizeArhiv = ""
    try {
        fs.stat(pyttt, (err, stats) => {
            if (stats){
                sizeArhiv = `${stats.size / 1024}`.split(".")[0]
            }
        });
    } catch(e) {
        console.log("нет файлов")
    }
    fs.readdir(paths, (err, files) => {
        if (err) {

        }
        try {
            files.forEach((file) => {
			console.log(file);
			if (file.split(".zi").length < 2) {

				if (file.indexOf("__MACOSX") !== -1) {
					try {
						deleteFile(paths+"/__MACOSX")
					}catch {

					}
					try {
						deleteFolder(paths+"/__MACOSX")
					}catch {

					}

					console.log('Подстрока найдена!');
				}else {
					if (file.indexOf(".DS_Store") !== -1) {
						try {
							deleteFile(paths+"/.DS_Store")
						}catch {

						}
						try {
							deleteFolder(paths+"/.DS_Store")
						}catch {

						}
						console.log('Подстрока найдена!');

					}else {
						x.push(file)
					}
				}
            });
        } catch {
            console.log("удаление")
        }

        let hasRef = req.url+"&has="+btoa(endCatalog)//создать has
        res.render("year/year.twig", {
            x: x,
            href: paths,
            god: god,
            mes: mes,
            com: com,
            val: val,
            tov: tov,
            plo: plo,
            ban: ban,
            poisc: poisc,
            poiscBanersName: poiscBanersName,
            I: I,
            has: has,
            SizeMeta: SizeMeta,
            sizeArhiv: sizeArhiv,
            tegTitel: tegTitel,
            hasRef: hasRef,
            admin: admin,
            vidimost: vidimost
        });
    });
}


module.exports.openvse = async (req, res) => {
    async function getParseSizeMeta(pathHtml){
        try {
            const html = fs.readFileSync(pathHtml, 'utf-8');
            s = html.split('<meta name="ad.size" content="')[1].split('">')[0]
            return s
        }catch{
            return "0"
        }
    }
    function findIndexHtmlPaths(dir) {
        // список путей к файлам index.html
        const paths = []
        // рекурсивная функция для поиска файлов index.html
        function walk(dir) {
            // получить список файлов и каталогов в текущем каталоге
            const files = fs.readdirSync(dir);
            // перебрать все файлы и каталоги
            for (const file of files) {
                // получить полный путь к файлу или каталогу
                const filePath = path.join(dir, file);
                // если это файл и его имя index.html, добавить его в список путей
                if (fs.statSync(filePath).isFile() && file === 'index.html') {
					paths.push(filePath);

                } else if (fs.statSync(filePath).isDirectory()) {
                    if (paths.length < 50) {
                        // если это каталог, рекурсивно вызвать функцию walk для этого каталога
                        walk(filePath);
                    }
                }
            }
        }
        // запустить рекурсивный поиск из заданного каталога
        walk(dir);
        // вернуть список путей к файлам index.html
        return paths;
    }
    const x = []
    let god = ""
    let god1 = ""
    let endCatalog = ""
    let vidimost = 0
    if (req.query.god !== undefined) {
        god = req.query.god
        god1 = "/" + god
    }
    let mes = ""
    let mes1 = ""
    if (req.query.mes !== undefined) {
        mes = req.query.mes
        mes1 = "/" + mes
    }
    let com = ""
    let com1 = ""
    if (req.query.com !== undefined) {
        com = req.query.com
        com1 = "/" + com
    }
    let val = ""
    let val1 = ""
    if (req.query.val !== undefined) {
        val = req.query.val
        val1 = "/" + val
    }
    let tov = ""
    let tov1 = ""
    if (req.query.tov !== undefined) {
        tov = req.query.tov
        tov1 = "/" + tov
    }
    let plo = ""
    let plo1 = ""
    if (req.query.plo !== undefined) {
        plo = req.query.plo
        plo1 = "/" + plo
    }
    let ban = ""
    let ban1 = ""
    if (req.query.ban !== undefined) {
        ban = req.query.ban
        ban1 = "/" + ban
    }
    let I = ""
    if (req.query.I !== undefined) {
        I = req.query.I
    }else{
        I = "0"
    }
    let paths = '../start/public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1
    poiscBaners = []
    try{
        poiscBaners = findIndexHtmlPaths(paths);
    } catch {
        poiscBaners = []
        console.log("ошибка получения")
    }

    const poisc = []
    let has = ""
    const poiscBanersName = []
    let ii = 0
    let pyt = ''
    const SizeMetaMass = []
    banersMass = []
    if (poiscBaners.length>0) {
        for (s in poiscBaners) {
            const bans = poiscBaners[s].split("\\")
            poisc.push(bans)
            poiscBanersName.push(bans[10])
            const strr = 'b/' + bans[4] + '/' + bans[5] + '/' + bans[6] + '/' + bans[7] + '/' + bans[8] + '/' + bans[9] + '/' + bans[10]//bans[10]
            let pytt = "public/"+strr+"/index.html"
            const SizeMeta = []
            strrr = await getParseSizeMeta(pytt)
            try {
                SizeMeta['strok'] = await strrr
                SizeMeta['width'] = await strrr.split("width=")[1].split(",")[0]
                SizeMeta['height'] = await strrr.split("height=")[1].split(",")[0]
                SizeMeta['len'] = await strrr.length
                if (SizeMeta['width'].includes('%')) {
                    SizeMeta['width'] = 700
                    SizeMeta['resize'] = "resize: horizontal;"
                    if (SizeMeta['height'].includes('%')) {
                        SizeMeta['resize'] = "resize: both;"
                        SizeMeta['height'] = 700
                    }
                } else {
                    if (SizeMeta['height'].includes('%')) {
                        SizeMeta['resize'] = "resize: vertical;"
                        SizeMeta['height'] = 700
                    }
                }
            }catch {}
            SizeMetaMass.push(SizeMeta)
            try {
                sss = btoa(strr)
            } catch {
                console.log("ошибка кодирования", strr)
            }

            if (ii.toString() === I) {
                pyt = strr
                has = btoa(strr) //создать has

            }
            banersMass.push(btoa(strr))
            ii = ii + 1
        }
    }
    res.render("year/openvse.twig", {
        SizeMetaMass: SizeMetaMass,
        banersMass: banersMass,
    })
}


module.exports.rempoz = async (req, res) => {
    const auth = new Auth();
    s = auth.chekCookie(req, res)
    let cookie = s

    let admin = 0
    if (s==="******" || s==="******"){
        //админ
        console.log('admin'+s);
        if (req.url.indexOf("admin=") !== -1) {
            res.redirect(req.url.split("admin=")[0])
            return
        }
        admin = s
    }else {
        res.render("year/auth.twig")
    }
    const fs = require("fs");
    const x = []
    let god = ""
    let god1 = ""

    if (req.query.god !== undefined) {
        god = req.query.god
        god1 = "/" + god
    }
    let mes = ""
    let mes1 = ""
    if (req.query.mes !== undefined) {
        mes = req.query.mes
        mes1 = "/" + mes
    }
    let com = ""
    let com1 = ""
    if (req.query.com !== undefined) {
        com = req.query.com
        com1 = "/" + com
    }
    let val = ""
    let val1 = ""
    if (req.query.val !== undefined) {
        val = req.query.val
        val1 = "/" + val
    }
    let tov = ""
    let tov1 = ""
    if (req.query.tov !== undefined) {
        tov = req.query.tov
        tov1 = "/" + tov
    }
    let plo = ""
    let plo1 = ""
    if (req.query.plo !== undefined) {
        plo = req.query.plo
        plo1 = "/" + plo
    }
    let ban = ""
    let ban1 = ""
    if (req.query.ban !== undefined) {
        ban = req.query.ban
        ban1 = "/" + ban
    }
    let file = ""
    let file1 = ""
    if (req.query.file !== undefined) {
        file = req.query.file
        file1 = "/" + file
    }
    let I = ""
    if (req.query.I !== undefined) {
        I = req.query.I
    }
    let paths = '../start/public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1 + file1
    let path = paths
	
    function deleteFolder(path) {
        // Получить список файлов и папок в указанном пути
        fs.readdir(path, (err, files) => {
            if (err) {
                // console.error('Ошибка при чтении папки:', err);
                return;
            }
            // Удалить все файлы в папке
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = `${path}/${file}`;
                try {
                    // Если это файл, удалить его
                    if (fs.lstatSync(filePath).isFile()) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                // console.error(`Ошибка при удалении файла ${file}:`, err);
                                return null;
                            }
                        });
                    }
                    // Если это папка, рекурсивно удалить ее
                    else if (fs.lstatSync(filePath).isDirectory()) {
                        deleteFolder(filePath);
                    }
                }catch {
                    console.log("удаление")
                }
            }
            // После удаления всех файлов и папок удалить саму папку
            fs.rmdir(path, (err) => {
                if (err) {
                    // console.error('Ошибка при удалении папки:', err);
                    return null;
                }
            });
        });
    }
    function deleteFile(path) {
        try {
            fs.unlink(path, (err) => {
                if (err) {}
            });
        }catch {
            console.log("удаление")
        }
    }
    try {
        deleteFolder(path)
    }catch {
        console.log("удаление")
    }
    try {
        deleteFile(path)
    }catch {
        console.log("удаление")
    }

    setTimeout(() => {
        try {
            deleteFolder(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 100);
    setTimeout(() => {
        try {
            deleteFile(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 200);
    try {
        deleteFolder(path)
    }catch {
        console.log("удаление")
    }
    try {
        deleteFile(path)
    }catch {
        console.log("удаление")
    }

    setTimeout(() => {
        try {
            deleteFolder(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 300);
    setTimeout(() => {
        try {
           deleteFile(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 400);
    try {
        deleteFolder(path)
    }catch {
        console.log("удаление")
    }
    try {
        deleteFile(path)
    }catch {
        console.log("удаление")
    }

    setTimeout(() => {
        try {
            deleteFolder(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 500);
    setTimeout(() => {
        try {
            deleteFile(path)
        } catch (err) {
            console.log("удаление");
        }
    }, 1000);
    setTimeout(() => {
        try {
            if (file !== ""){
                const resaveZip = new ResaveZip();
                resaveZip.resaveZipInNew("../start/"+'public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1)
            }

        } catch (err) {
            console.log("Обновление архива");
        }
    }, 1100);
    setTimeout(() => {
        try {
            deleteFile(path+".zip")
        } catch (err) {
            console.log("удаление архива");
        }
    }, 1200);

    setTimeout(() =>  res.redirect('back') , 1800);
}


module.exports.rename = async (req, res) =>  {
    const auth = new Auth();
    s = auth.chekCookie(req, res)
    let cookie = s

    let admin = 0
    if (s==="******" || s==="******"){
        //админ
        console.log('admin'+s);
        if (req.url.indexOf("admin=") !== -1) {
            res.redirect(req.url.split("admin=")[0])
            return
        }
        admin = s
    }else {
        res.render("year/auth.twig")
    }

    const fs = require("fs");
    let god = ""
    let god1 = ""

    if (req.query.god !== undefined) {
        god = req.query.god
        god1 = "/" + god
    }
    let mes = ""
    let mes1 = ""
    if (req.query.mes !== undefined) {
        mes = req.query.mes
        mes1 = "/" + mes
    }
    let com = ""
    let com1 = ""
    if (req.query.com !== undefined) {
        com = req.query.com
        com1 = "/" + com
    }
    let val = ""
    let val1 = ""
    if (req.query.val !== undefined) {
        val = req.query.val
        val1 = "/" + val
    }
    let tov = ""
    let tov1 = ""
    if (req.query.tov !== undefined) {
        tov = req.query.tov
        tov1 = "/" + tov
    }
    let plo = ""
    let plo1 = ""
    if (req.query.plo !== undefined) {
        plo = req.query.plo
        plo1 = "/" + plo
    }
    let ban = ""
    let ban1 = ""
    if (req.query.ban !== undefined) {
        ban = req.query.ban
        ban1 = "/" + ban
    }
    let file = ""
    let file1 = ""
    if (req.query.file !== undefined) {
        file = req.query.file
        file1 = "/" + file
    }
    let newName = ""
    if (req.query.newName !== undefined) {
        newName = req.query.newName
        newName1 = "/" + newName
    }
    let paths = 'public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1 + file1
    const result = paths.substring(0, paths.lastIndexOf('/') + 1)+newName;
    fs.rename(paths, result, (err) => {
        if (err) throw err;
        console.log('Папка успешно переименована!');
        try {
            if (ban!=="") {
                if (file==="") {
                    setTimeout(() => {
                        fs.rename(paths + ".zip", result + ".zip", (err) => {
                            if (err) throw err;
                            // res.redirect('back')
                        });
                    }, 300);
                }
            }
        }catch {
            // res.redirect('back')
        }
        const resaveZip = new ResaveZip();
        if (ban!=="") {
            if (file !== "") {
                resaveZip.resaveZipInNew("../start/" + 'public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1)
            }
        }
        setTimeout(() =>  res.redirect('back') , 1000);
    });

}


module.exports.save = async (req, res) =>  {
    const fs = require("fs");
    let god = ""
    let god1 = ""
    if (req.query.god !== undefined) {
        god = req.query.god
        god1 = "/" + god
    }
    let mes = ""
    let mes1 = ""
    if (req.query.mes !== undefined) {
        mes = req.query.mes
        mes1 = "/" + mes
    }
    let com = ""
    let com1 = ""
    if (req.query.com !== undefined) {
        com = req.query.com
        com1 = "/" + com
    }
    let val = ""
    let val1 = ""
    if (req.query.val !== undefined) {
        val = req.query.val
        val1 = "/" + val
    }
    let tov = ""
    let tov1 = ""
    if (req.query.tov !== undefined) {
        tov = req.query.tov
        tov1 = "/" + tov
    }
    let plo = ""
    let plo1 = ""
    if (req.query.plo !== undefined) {
        plo = req.query.plo
        plo1 = "/" + plo
    }
    let ban = ""
    let ban1 = ""
    if (req.query.ban !== undefined) {
        ban = req.query.ban
        ban1 = "/" + ban
    }
    let file = ""
    let file1 = ""
    if (req.query.file !== undefined) {
        file = req.query.file
        file1 = "/" + file
    }
    let paths = 'public/b' + god1 + mes1 + com1 + val1 + tov1 + plo1 + ban1 + file1

    if (fs.lstatSync(paths).isFile()) {
        res.download(paths);
    }else{
        const zipp = new AdmZip();
        zipp.addLocalFolder(paths);
        const name = paths.split("/").pop();
        zipp.writeZip(`uploads/${name}.zip`, true);

        nameZip = name + ".zip"
        const zip = new AdmZip('uploads/'+nameZip);
        const entries = zip.getEntries();
        mass = []
        entries.forEach((entry) => {
            mass.push(entry.entryName)
        });
        massrem = []
        mass.forEach(function(item, i, arr) {
            mass.forEach(function(item1, i, arr) {
                if (item.indexOf(".zip") !== -1) {
                    if (item1.indexOf(item.split(".zip")[0]+'/') !== -1) {
                        if (item1.length === item.split(".zip")[0].length+1){
                            massrem.push(item1)
                        }
                    }
                }
            });
        });
        massrem.forEach((entry) => {
            zip.deleteFile(entry)
        });
        zip.writeZip('uploads/'+nameZip);
        res.download(`uploads/${name}.zip`);

    }
}