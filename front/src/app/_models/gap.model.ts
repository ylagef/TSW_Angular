export class Gap {
    gap_id: number;
    poll_id: number;
    start_date: Date;
    end_date: Date;
    public dates: Date[];

    constructor(gap_id = 0, poll_id = null, start_date = null, end_date = null) {
        this.gap_id = gap_id;
        this.poll_id = poll_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.dates = [];
    }
}