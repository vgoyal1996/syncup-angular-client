import { ReturnForm } from './ReturnForm';

export class ClientReturnForms {
    private id: number;
    private assessmentYear: string;
    private returnForm: ReturnForm;
    private acknowledgementNo: string;
    private dateOfFiling: string;
    private dateOfPhysicalDeposit: string;

    get getAcknowledgementNo(): string {
        return this.acknowledgementNo;
    }

    get getDateOfFiling(): string {
        return this.dateOfFiling;
    }

    get getDateOfPhysicalDeposit(): string {
        return this.dateOfPhysicalDeposit;
    }

    get getId(): number {
        return this.id;
    }

    get getReturnForm(): ReturnForm {
        return this.returnForm;
    }

    get getAssessmentYear(): string {
        return this.assessmentYear;
    }

    set setAcknowledgementNo(value: string) {
        this.acknowledgementNo = value;
    }

    set setDateOfFiling(value: string) {
        this.dateOfFiling = value;
    }

    set setDateOfPhysicalDeposit(value: string) {
        this.dateOfPhysicalDeposit = value;
    }

    mapResponseToClientReturnForm(response) {
        this.id = response.id;
        this.returnForm = new ReturnForm();
        this.returnForm.mapResponseToReturnForm(response.returnForm);
        this.acknowledgementNo = response.acknowledgementNo;
        this.dateOfFiling = response.dateOfFiling;
        this.dateOfPhysicalDeposit = response.dateOfPhysicalDeposit;
    }

}