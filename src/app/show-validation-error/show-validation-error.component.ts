import { Component, Input, Optional } from '@angular/core';
import { NgForm, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-show-validation-error',
  templateUrl: './show-validation-error.component.html',
  styleUrls: ['./show-validation-error.component.css']
})
export class ShowValidationErrorComponent {

  @Input('path') path;

  constructor(@Optional() private ngForm: NgForm,
    @Optional() private formGroup: FormGroupDirective) {
  }

  get errorMessages(): string[] {
    let form: FormGroup;
    if (this.ngForm) {
      form = this.ngForm.form;
    } else {
      form = this.formGroup.form;
    }
    const control = form.get(this.path);
    const messages = [];
    if (!control || !(control.touched) || !control.errors) {
      return null;
    }
    for (const code in control.errors) {
      if (control.errors.hasOwnProperty(code)) {
        const error = control.errors[code];
        let message = '';
        switch (code) {
          case 'required':
            message = "is a required field";
            break;
          case 'minlength':
            message = `must contain at least ${error.requiredLength} characters`;
            break;
          case 'maxlength':
            message = `must contain a maximum of ${error.requiredLength} characters`;
            break;
          case 'invalidEmail':
            message = `Please enter a valid email address`;
            break;
            case 'invalidUrl':
            message = `Please enter a valid Url`;
            break;
          default:
            message = `is not valid`;
        }
        messages.push(message);
      }
    }
    return messages;
  }

}
