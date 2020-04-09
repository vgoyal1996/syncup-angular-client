import {NgForm} from '@angular/forms';

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

  constructor(form: NgForm) {
    this.name = form.form.controls.clientName.value;
    this.clientCode = form.form.controls.clientCode.value;
    this.fatherName = form.form.controls.fatherName.value;
    this.flatNo = form.form.controls.flatNo.value;
    this.area = form.form.controls.area.value;
    this.city = form.form.controls.city.value;
    this.state = form.form.controls.state.value;
    this.pin = form.form.controls.pin.value;
    this.clientType = form.form.controls.clientType.value;
    this.mobile = form.form.controls.mobile.value;
    this.clientEmail = form.form.controls.emailId.value;
    this.pan = form.form.controls.pan.value;
    this.doiOrDob = form.form.controls.dobOrDoi.value;
    this.responsiblePersonName = form.form.controls.responsiblePersonName.value;
    this.responsiblePersonPAN = form.form.controls.responsiblePersonPAN.value;
    this.responsiblePersonDOB = form.form.controls.responsiblePersonDOB.value;
    this.responsiblePersonAadhaar = form.form.controls.responsiblePersonAadhaar.value;
    this.cin = form.form.controls.cin.value;
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
