export class Assignation {
     assignation_id: number;
     user_id: number;
     gap_id: number;

    constructor(assignation_id = null, user_id, gap_id) {
        this.assignation_id = assignation_id;
        this.user_id = user_id;
        this.gap_id = gap_id;
    }
}