const {log}             = require("nodemon/lib/utils");
const config             = require("config");

class Auth {
    constructor(Auth) {
        this.Auth = Auth;
    }

	//Проверка Куки
    chekCookie(req, res) {

        //админы
        if (req.cookies.admin !== undefined) {
            if (req.query.admin !== undefined) {
                let has = req.query.admin
                res.cookie('admin', has, {maxAge: 3600 * 24*1000*30, secure: true});
                return atob(has)
            }
            console.log("Куки найдены")
            return atob(req.cookies.admin)
        } else {
            console.log("Куки отсутствуют")
            let has = "NONE"
            if (req.query.admin !== undefined) {
                has = req.query.admin
                res.cookie('admin', has, {maxAge: 3600 * 24*1000*30, secure: true});
                return atob(has)
            }
        }

        //Пользователи

        if (req.cookies.has !== undefined) {
            console.log("Куки найдены")
            if (req.query.has !== undefined) {
                let has = req.query.has
                res.cookie('has', has, {maxAge: 3600 * 24*1000*30, secure: true});
            }
            return atob(req.cookies.has)
        } else {
            console.log("Куки отсутствуют")
            let has = "NONE"
            if (req.query.has !== undefined) {
                has = req.query.has
            }
            res.cookie('has', has, {maxAge: 3600 * 24*1000*30, secure: true});
            return atob(has)
        }
    }
}

module.exports = Auth;