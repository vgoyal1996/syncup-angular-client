import { DueDateScheduler } from './DueDateScheduler';

export class ReturnForm {
  private formId: number;
  private formName: string;
  private returnType: string;
  private periodicity: string;
  private monthlyDayOccurrence: number;
  private yearlyDayOccurrence: number;
  private firstQuarterDayOccurrence: number;
  private secondQuarterDayOccurrence: number;
  private thirdQuarterDayOccurrence: number;
  private fourthQuarterDayOccurrence: number;
  private yearlyMonthOccurrence: number;
  private firstQuarterMonthOccurrence: number;
  private secondQuarterMonthOccurrence: number;
  private thirdQuarterMonthOccurrence: number;
  private fourthQuarterMonthOccurrence: number;
  private dueDateSchedulerSet: DueDateScheduler[];

  constructor() {}

  mapResponseToReturnForm(response) {
    this.formId = response.formId;
    this.formName = response.formName;
    this.returnType = response.returnType;
    this.periodicity = response.periodicity;
    this.dueDateSchedulerSet = [];
    response.dueDateSchedulerSet.forEach(scheduler => {
      let dueDateScheduler = new DueDateScheduler();
      if (scheduler.toBeDelete == 0) {
        dueDateScheduler.mapResponseToDueDateScheduler(scheduler);
        this.dueDateSchedulerSet.push(dueDateScheduler);
      }
    });
  }

  get getFormId(): number {
    return this.formId;
  }

  set setFormId(value: number) {
    this.formId = value;
  }

  get getFormName(): string {
    return this.formName;
  }

  set setFormName(value: string) {
    this.formName = value;
  }

  get getReturnType(): string {
    return this.returnType;
  }

  set setReturnType(value: string) {
    this.returnType = value;
  }

  get getPeriodicity(): string {
    return this.periodicity;
  }

  set setMonthlyDayOccurrence(value: number) {
    this.monthlyDayOccurrence = value;
  }

  get getMonthlyDayOccurrence(): number {
    return this.monthlyDayOccurrence;
  }

  set setYearlyDayOccurrence(value: number) {
    this.yearlyDayOccurrence = value;
  }

  get getYearlyDayOccurrence(): number {
    return this.yearlyDayOccurrence;
  }

  set setFirstQuarterDayOccurrence(value: number) {
    this.firstQuarterDayOccurrence = value;
  }

  get getFirstQuarterDayOccurrence(): number {
    return this.firstQuarterDayOccurrence;
  }

  set setSecondQuarterDayOccurrence(value: number) {
    this.secondQuarterDayOccurrence = value;
  }

  get getSecondQuarterDayOccurrence(): number {
    return this.secondQuarterDayOccurrence;
  }

  set setThirdQuarterDayOccurrence(value: number) {
    this.thirdQuarterDayOccurrence = value;
  }

  get getThirdQuarterDayOccurrence(): number {
    return this.thirdQuarterDayOccurrence;
  }

  set setFourthQuarterDayOccurrence(value: number) {
    this.fourthQuarterDayOccurrence = value;
  }

  get getFourthQuarterDayOccurrence(): number {
    return this.fourthQuarterDayOccurrence;
  }

  set setPeriodicity(value: string) {
    this.periodicity = value;
  }

  get getDueDateSchedulerSet(): DueDateScheduler[] {
    return this.dueDateSchedulerSet;
  }

  set setDueDateSchedulerSet(value: DueDateScheduler[]) {
    this.dueDateSchedulerSet = value;
  }

  set setYearlyMonthOccurrence(value: number) {
    this.yearlyMonthOccurrence = value;
  }

  get getYearlyMonthOccurrence(): number {
    return this.yearlyMonthOccurrence;
  }

  set setFirstQuarterMonthOccurrence(value: number) {
    this.firstQuarterMonthOccurrence = value;
  }

  get getFirstQuarterMonthOccurrence(): number {
    return this.firstQuarterMonthOccurrence;
  }

  set setSecondQuarterMonthOccurrence(value: number) {
    this.secondQuarterMonthOccurrence = value;
  }

  get getSecondQuarterMonthOccurrence(): number {
    return this.secondQuarterMonthOccurrence;
  }

  set setThirdQuarterMonthOccurrence(value: number) {
    this.thirdQuarterMonthOccurrence = value;
  }

  get getThirdQuarterMonthOccurrence(): number {
    return this.thirdQuarterMonthOccurrence;
  }

  set setFourthQuarterMonthOccurrence(value: number) {
    this.fourthQuarterMonthOccurrence = value;
  }

  get getFourthQuarterMonthOccurrence(): number {
    return this.fourthQuarterMonthOccurrence;
  }

}
