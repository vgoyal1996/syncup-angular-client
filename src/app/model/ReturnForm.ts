export class ReturnForm {
  private formId: number;
  private formName: string;
  private returnType: string;
  private dueDateOfFiling: string;
  private periodicity: string;
  private revisedDueDateOfFiling: string;

  constructor() {}

  mapResponseToReturnForm(response) {
    this.formId = response.formId;
    this.formName = response.formName;
    this.returnType = response.returnType;
    this.dueDateOfFiling = response.dueDateOfFiling;
    this.periodicity = response.periodicity;
    this.revisedDueDateOfFiling = response.revisedDueDateOfFiling;
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
