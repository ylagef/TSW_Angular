export class Poll {
    poll_id: number;
    title: string;
    place: string;
    author: string;
    url: string;

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