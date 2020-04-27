import { ReturnForm } from './ReturnForm';

export class ClientReturnForms {
    private id: ClientReturnFormsId;
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

    get getId(): ClientReturnFormsId {
        return this.id;
    }

    get getReturnForm(): ReturnForm {
        return this.returnForm;
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
        this.id = new ClientReturnFormsId(response.id.clientId, response.id.formName, response.id.assessmentYear);
        this.returnForm = new ReturnForm();
        this.returnForm.mapResponseToReturnForm(response.returnForm);
        this.acknowledgementNo = response.acknowledgementNo;
        this.dateOfFiling = response.dateOfFiling;
        this.dateOfPhysicalDeposit = response.dateOfPhysicalDeposit;
    }

}

export class ClientReturnFormsId {
    private clientId: number;
    private formName: string;
    private assessmentYear: string;

    constructor(clientId: number, formName: string, assessmentYear: string) {
        this.clientId = clientId;
        this.formName = formName;
        this.assessmentYear = assessmentYear;
    }

    get getClientId(): number {
        return this.clientId;
    }

    get getFormName(): string {
        return this.formName;
    }

    get getAssessmentYear(): string {
        return this.assessmentYear;
    }
}