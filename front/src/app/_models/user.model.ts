export class User {
    user_id: number;
    username: string;
    name: string;
    email: string;
    token: string = null;

    constructor(user_id, username, name, email) {
        this.user_id = user_id;
        this.username = username;
        this.name = name;
        this.email = email;
    }

    set jwt(jwt: string) {
        this.token = jwt;
    }
}