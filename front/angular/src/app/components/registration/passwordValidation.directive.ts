import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

/** A hero's name can't match the hero's alter ego */
export const passwordValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const password_confirm = control.get('password_confirm');

    return password && password_confirm && password.value !== password_confirm.value ? { 'passwordValidation': true } : null;
};