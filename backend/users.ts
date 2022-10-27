export class User {
    constructor( public email: string, 
                 public name: string, 
                 private password: string) {}
                
    //função para verificar se o email e senha que estão vindo existem
    matches(another: User): boolean {
        return another !== undefined && 
               another.email === this.email &&
               another.password === this.password;
    }
}

export const users: {[key: string]: User} = {
    "gustavogoulart92@gmail.com": new User('gustavogoulart92@gmail.com', 'Gustavo', '15975321'),
    "beatriz.t.ff@hotmail.com": new User('beatriz.t.ff@hotmail.com', 'Beatriz', '123456'),
}