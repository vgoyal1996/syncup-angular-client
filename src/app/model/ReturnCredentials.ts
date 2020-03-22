import {NgForm} from '@angular/forms';

export class ReturnCredentials {

  private returnId: number;
  private id: number;
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

  constructor() {

  }

  get getReturnId(): number {
    return this.returnId;
  }

  set setReturnId(value: number) {
    this.returnId = value;
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
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
}
