export class Poll {
    private poll_id: number;
    private title: string;
    private place: string;
    private author: string;
    private url: string;

    constructor(poll_id, title, place, author, url) {
        this.poll_id = poll_id;
        this.title = title;
        this.place = place;
        this.author = author;
        this.url = url;
    }
}