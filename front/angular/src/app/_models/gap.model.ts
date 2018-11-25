export class Gap {
    private gap_id: number;
    private poll_id: number;
    private start_date: Date;
    private end_date: Date;

    constructor(gap_id = 0, poll_id = null, start_date = null, end_date = null) {
        this.gap_id = gap_id;
        this.poll_id = poll_id;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}