import { FormControl, FormGroup } from '@angular/forms';
/*
  Custom validators to use everywhere.
*/

// SINGLE FIELD VALIDATORS
export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

// SINGLE FIELD VALIDATORS
export function charOnly(control: FormControl): { [key: string]: any } {
  var regexp = /^[a-zA-z]*$/i;
  if (control.value && !regexp.test(control.value)) {
    return { invalidChar: true };
  }
}

// SINGLE FIELD VALIDATORS
export function alphaNumeric(control: FormControl): { [key: string]: any } {
  var regexp = /[a-zA-Z][a-zA-Z0-9-_\.]{5,12}$/i;
  if (control.value && !regexp.test(control.value)) {
    return { invalid: true };
  }
}

// SINGLE FIELD VALIDATORS
export function passwordMatch(control: FormControl): { [key: string]: any } {
  var regexp = /^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{4,10}$/;
  if (control.value && !regexp.test(control.value)) {
    return { invalid: true };
  }
}

// FORM GROUP VALIDATORS
// export function matchingPasswords(passwordKey: string, confirmPasswordKey: string, formGroup : any) {
//   return (group: FormGroup): {[key: string]: any} => {
//     let password = group.controls[passwordKey];
//     let confirmPassword = group.controls[confirmPasswordKey];

//     if (password.value !== confirmPassword.value) {
//       return {
//         mismatchedPasswords: true
//       };
//     }
//   }
// }

export function matchPasswords(cnfrmPassword: FormControl): { [key: string]: any } {
  if (cnfrmPassword.parent != undefined) {
    let password = cnfrmPassword.parent.controls['Password'];
    if (cnfrmPassword.value && cnfrmPassword.value !== password.value) {
      return { passwordsMatch: true };
    }
  }
}
