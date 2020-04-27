import { ClientReturnForms } from './ClientReturnForms';

export class ReturnCredentials {

  private returnId: number;
  private assessmentYear: string;
  private returnType: string;
  private gstNo: string;
  private tanNo: string;
  private flatNo: string;
  private area: string;
  private city: string;
  private state: string;
  private pin: string;
  private userId: string;
  private password: string;
  private tracesUserId: string;
  private tracesPassword: string;
  private applicableReturnForms: string[];
  private returnFormsList: ClientReturnForms[];

  constructor() {

  }

  public mapResponseToReturnCredentials(response: any) {
    this.returnId = response.returnId;
    this.assessmentYear = response.assessmentYear;
    this.returnType = response.returnType;
    this.gstNo = response.gstNo;
    this.tanNo = response.tanNo;
    this.flatNo = response.flatNo;
    this.area = response.area;
    this.city = response.city;
    this.state = response.state;
    this.pin = response.pin;
    this.userId = response.userId;
    this.password = response.password;
    this.tracesUserId = response.tracesUserId;
    this.tracesPassword = response.tracesPassword;
    this.returnFormsList = [];
    response.returnFormsList.forEach(element => {
      let clientReturnForm = new ClientReturnForms();
      clientReturnForm.mapResponseToClientReturnForm(element);
      this.returnFormsList.push(clientReturnForm);
    });
  }

  get getReturnId(): number {
    return this.returnId;
  }

  set setReturnId(value: number) {
    this.returnId = value;
  }

  get getAssessmentYear(): string {
    return this.assessmentYear;
  }

  set setAssessmentYear(value: string) {
    this.assessmentYear = value;
  }

  get getReturnType(): string {
    return this.returnType;
  }

  set setReturnType(value: string) {
    this.returnType = value;
  }

  get getGstNo(): string {
    return this.gstNo;
  }

  set setGstNo(value: string) {
    this.gstNo = value;
  }

  get getTanNo(): string {
    return this.tanNo;
  }

  set setTanNo(value: string) {
    this.tanNo = value;
  }

  get getFlatNo(): string {
    return this.flatNo;
  }

  set setFlatNo(value: string) {
    this.flatNo = value;
  }

  get getArea(): string {
    return this.area;
  }

  set setArea(value: string) {
    this.area = value;
  }

  get getCity(): string {
    return this.city;
  }

  set setCity(value: string) {
    this.city = value;
  }

  get getState(): string {
    return this.state;
  }

  set setState(value: string) {
    this.state = value;
  }

  get getPin(): string {
    return this.pin;
  }

  set setPin(value: string) {
    this.pin = value;
  }

  get getUserId(): string {
    return this.userId;
  }

  set setUserId(value: string) {
    this.userId = value;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  get getTracesUserId(): string {
    return this.tracesUserId;
  }

  set setTracesUserId(value: string) {
    this.tracesUserId = value;
  }

  get getTracesPassword(): string {
    return this.tracesPassword;
  }

  set setTracesPassword(value: string) {
    this.tracesPassword = value;
  }

  get getApplicableReturnForms(): string[] {
    return this.applicableReturnForms;
  }

  set setApplicableReturnForms(applicableReturnForms: string[]) {
    this.applicableReturnForms = applicableReturnForms;
  }

  get getReturnFormsList(): ClientReturnForms[] {
    return this.returnFormsList;
  }

  set setReturnFormList(value: ClientReturnForms[]) {
    this.returnFormsList = value;
  }
}
