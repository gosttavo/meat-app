"use strict";
exports.__esModule = true;
var User = (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    //função para verificar se o email e senha que estão vindo existem
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "gustavogoulart92@gmail.com": new User('gustavogoulart92@gmail.com', 'Gustavo', '15975321'),
    "beatriz.t.ff@hotmail.com": new User('beatriz.t.ff@hotmail.com', 'Beatriz', '123456')
};
