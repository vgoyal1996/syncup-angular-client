import {NgForm, FormGroup} from '@angular/forms';

export class Client {

  private id: number;
  private name: string;
  private clientCode: string;
  private fatherName: string;
  private flatNo: string;
  private area: string;
  private city: string;
  private state: string;
  private pin: string;
  private clientType: string;
  private mobile: string;
  private clientEmail: string;
  private pan: string;
  private doiOrDob: string;
  private responsiblePersonName: string;
  private responsiblePersonPAN: string;
  private responsiblePersonDOB: string;
  private responsiblePersonAadhaar: string;
  private cin: string;

  constructor() {}

  public setFieldsFromForm(clientForm: FormGroup) {
    this.name = clientForm.controls.clientName.value;
    this.clientCode = clientForm.controls.clientCode.value;
    this.fatherName = clientForm.controls.fatherName.value;
    this.flatNo = clientForm.controls.flatNo.value;
    this.area = clientForm.controls.area.value;
    this.city = clientForm.controls.city.value;
    this.state = clientForm.controls.state.value;
    this.pin = clientForm.controls.pin.value;
    this.clientType = clientForm.controls.clientType.value;
    this.mobile = clientForm.controls.mobile.value;
    this.clientEmail = clientForm.controls.emailId.value;
    this.pan = clientForm.controls.pan.value;
    this.doiOrDob = clientForm.controls.dobOrDoi.value;
    this.responsiblePersonName = clientForm.controls.responsiblePersonName.value;
    this.responsiblePersonPAN = clientForm.controls.responsiblePersonPan.value;
    this.responsiblePersonDOB = clientForm.controls.responsiblePersonDob.value;
    this.responsiblePersonAadhaar = clientForm.controls.responsiblePersonAadhaar.value;
    this.cin = clientForm.controls.cin.value;
  }

  mapResponseToClientObject(response) {
    this.name = response.name;
    this.clientCode = response.clientCode;
    this.fatherName = response.fatherName;
    this.flatNo = response.flatNo;
    this.area = response.area;
    this.city = response.city;
    this.state = response.state;
    this.pin = response.pin;
    this.clientType = response.clientType;
    this.mobile = response.mobile;
    this.clientEmail = response.clientEmail;
    this.pan = response.pan;
    this.doiOrDob = response.doiOrDob;
    this.responsiblePersonName = response.responsiblePersonName;
    this.responsiblePersonPAN = response.responsiblePersonPAN;
    this.responsiblePersonDOB = response.responsiblePersonDOB;
    this.responsiblePersonAadhaar = response.responsiblePersonAadhaar;
    this.cin = response.cin;
  }

  get getName(): string {
    return this.name;
  }

  set setName(value: string) {
    this.name = value;
  }

  get getClientCode(): string {
    return this.clientCode;
  }

  set setClientCode(value: string) {
    this.clientCode = value;
  }

  get getFatherName(): string {
    return this.fatherName;
  }

  set setFatherName(value: string) {
    this.fatherName = value;
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
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

  get getClientType(): string {
    return this.clientType;
  }

  set setClientType(value: string) {
    this.clientType = value;
  }

  get getMobile(): string {
    return this.mobile;
  }

  set setMobile(value: string) {
    this.mobile = value;
  }

  get getClientEmail(): string {
    return this.clientEmail;
  }

  set setClientEmail(value: string) {
    this.clientEmail = value;
  }

  get getPan(): string {
    return this.pan;
  }

  set setPan(value: string) {
    this.pan = value;
  }

  get getDoiOrDob(): string {
    return this.doiOrDob;
  }

  set setDoiOrDob(value: string) {
    this.doiOrDob = value;
  }

  get getResponsiblePersonName(): string {
    return this.responsiblePersonName;
  }

  set setResponsiblePersonName(value: string) {
    this.responsiblePersonName = value;
  }

  get getResponsiblePersonPAN(): string {
    return this.responsiblePersonPAN;
  }

  set setResponsiblePersonPAN(value: string) {
    this.responsiblePersonPAN = value;
  }

  get getResponsiblePersonDOB(): string {
    return this.responsiblePersonDOB;
  }

  set setResponsiblePersonDOB(value: string) {
    this.responsiblePersonDOB = value;
  }

  get getResponsiblePersonAadhaar(): string {
    return this.responsiblePersonAadhaar;
  }

  set setResponsiblePersonAadhaar(value: string) {
    this.responsiblePersonAadhaar = value;
  }

  get getCin(): string {
    return this.cin;
  }

  set setCin(value: string) {
    this.cin = value;
  }
}
