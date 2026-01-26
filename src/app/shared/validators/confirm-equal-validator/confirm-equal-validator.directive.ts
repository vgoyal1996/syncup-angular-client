import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }],
  standalone: false
})
export class ConfirmEqualValidatorDirective implements Validator {

  constructor() { }

  @Input() appConfirmEqualValidator: string;

  registerOnValidatorChange(fn: () => void): void {
  }
  validate(control: AbstractControl): { [key: string]: boolean } | null {
    const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
    if (controlToCompare.value !== control.value) {
      return { 'notEqual': true };
    }
    return null;
  }

}
