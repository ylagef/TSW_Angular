export class User {
    private user_id: number;
    private username: string;
    private name: string;
    private email: string;

    constructor(user_id, username, name, email) {
        this.user_id = user_id;
        this.username = username;
        this.name = name;
        this.email = email;
    }
}