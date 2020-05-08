export class DueDateScheduler {
    private id: number;
    private formName: string;
    private startDate: string;
    private endDate: string;
    private dueDateOfFiling: string;
    private revisedDueDateOfFiling: string;
    private toBeDelete: number;

    constructor() { }

    mapResponseToDueDateScheduler(response) {
        this.id = response.id;
        this.startDate = response.fromDate;
        this.endDate = response.toDate;
        this.dueDateOfFiling = response.dueDateOfFiling;
        this.revisedDueDateOfFiling = response.revisedDueDateOfFiling;
        this.toBeDelete = response.toBeDelete;
    }
 
    get getId(): number {
        return this.id;
    }

    set setId(value: number) {
        this.id = value;
    }

    get getToBeDelete(): number {
        return this.toBeDelete;
    }

    set setToBeDelete(value: number) {
        this.toBeDelete = value;
    }

    get getFormName(): string {
        return this.formName;
    }

    set setFormName(value: string) {
        this.formName = value;
    }

    get getStartDate(): string {
        return this.startDate;
    }

    set setStartDate(value: string) {
        this.startDate = value;
    }

    get getEndDate(): string {
        return this.endDate;
    }

    set setEndDate(value: string) {
        this.endDate = value;
    }

    get getDueDateOfFiling(): string {
        return this.dueDateOfFiling;
    }

    set setDueDateOfFiling(value: string) {
        this.dueDateOfFiling = value;
    }

    get getRevisedDueDateOfFiling(): string {
        return this.revisedDueDateOfFiling;
    }

    set setRevisedDueDateOfFiling(value: string) {
        this.revisedDueDateOfFiling = value;
    }
}