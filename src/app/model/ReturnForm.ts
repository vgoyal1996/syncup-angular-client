export class ReturnForm {
  formId: number;
  formName: string;
  returnType: string;
  dueDateOfFiling: string;
  periodicity: string;
  revisedDueDateOfFiling: string;

  constructor(formName: string, returnType: string, dueDateOfFiling: string, periodicity: string, revisedDueDateOfFiling: string) {
    this.formName = formName;
    this.returnType = returnType;
    this.dueDateOfFiling = dueDateOfFiling;
    this.periodicity = periodicity;
    this.revisedDueDateOfFiling = revisedDueDateOfFiling;
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

  get getDueDateOfFiling(): string {
    return this.dueDateOfFiling;
  }

  set setDueDateOfFiling(value: string) {
    this.dueDateOfFiling = value;
  }

  get getPeriodicity(): string {
    return this.periodicity;
  }

  set setPeriodicity(value: string) {
    this.periodicity = value;
  }

  get getRevisedDueDateOfFiling(): string {
    return this.revisedDueDateOfFiling;
  }

  set setRevisedDueDateOfFiling(value: string) {
    this.revisedDueDateOfFiling = value;
  }

}
