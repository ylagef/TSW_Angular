export class Poll {
    private poll_id: number;
    private title: string;
    private place: string;
    private author: string;
    private url: string;

    constructor(poll_id = null, title = null, place = null, author = null, url = null) {
        this.poll_id = poll_id;
        this.title = title;
        this.place = place;
        this.author = author;
        this.url = url;
    }

    getPlace() {
        return this.place;
    }
}