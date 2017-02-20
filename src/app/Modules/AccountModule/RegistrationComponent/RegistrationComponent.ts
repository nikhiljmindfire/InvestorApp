import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef, MdDialogClose, MdDialogActions, MdDialogContent, MdTooltipModule } from '@angular/material';
import { ToasterConfig, ToasterContainerComponent, Toast } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { IUsers } from '../../../DTO';
import { matchPasswords, emailValidator, charOnly, alphaNumeric, passwordMatch } from '../../../Validator/Validation';
import { ToastServices } from '../../../Services/ToastServices/ToastServices';

//decorator
@Component({
    moduleId: module.id,
    selector: 'Registration-Form',
    templateUrl: './Template/RegistrationComponent.html',
    styleUrls: ['../../../Styles/toaster.css'],
    providers: [ToastServices]
})

export class RegistrationComponent implements OnInit {
    public userFormGroup: FormGroup;
    public isSubmit: boolean;
    public events: any[] = [];

    toastRef: Toast;
    toast: Toast
    dialogRef: MdDialogRef<any>;
    toasterConfig: ToasterConfig;

    formErrors = {
        'Name': '',
        'Email': '',
        'UserName': '',
        'Password': '',
        'ConfirmPassword': '',
    };

    validationMessages = {
        'Name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
            'invalidChar': 'Name can contain only characters.'
        },
        'Email': {
            'required': 'Email is required.',
            'invalidEmail': 'Email must be in format(abc@domain.com)'
        },
        'UserName': {
            'required': 'Username is required.',
            'minlength': 'Username must be at least 4 characters long.',
            'maxlength': 'Username cannot be more than 24 characters long.',
            'invalid': 'UserName must be alphanumeric.'
        },
        'Password': {
            'required': 'Password is required.',
            'invalid': 'Password must contain at least 1 lower case, 1 upper case, 1 digit, 1 special character and no whitespace.',
            'maxlength': 'Password cannot be more than 10 characters long.',
        },
        'ConfirmPassword': {
            'required': 'Confirm password is required.',
            'passwordsMatch': 'Passwords must match.'
        }
    };

    toolTips = {
        'Name': 'Name must contain characters only',
        'Email': 'Email is required. e.g. abc@domain.com',
        'UserName': 'UserName must contain at least 6 characters and must be alphanumeric',
        'Password': 'Password must contain 6-12 characters(minimum 4 different characters with at least 1   alphabet and 1 digit / special character)',
        'ConfirmPassword': 'Confirm Password must contain 6-12 characters(minimum 4 different characters with at least 1   alphabet and 1 digit / special character)'
    }

    constructor(private fb: FormBuilder, private router: Router, public diaRef: MdDialogRef<RegistrationComponent>, private toasterService: ToastServices) {
        this.dialogRef = diaRef;
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });

        this.toasterConfig = toasterService.toasterconfig;
    }

    ngOnInit() {
        this.userFormGroup = this.fb.group({
            Name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24), charOnly]],
            Email: ['', [Validators.required, emailValidator]],
            UserName: ['', [Validators.minLength(4), <any>Validators.required, Validators.maxLength(24), alphaNumeric]],
            Password: ['', [Validators.required, Validators.maxLength(10), passwordMatch]],
            ConfirmPassword: ['', [Validators.required, matchPasswords]]
        });

        this.setForm();
    }

    setForm = function () {
        this.userFormGroup.valueChanges
            .subscribe((data: any) => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (this.toastRef != undefined)
            this.hideToast();
        if (!this.userFormGroup) {
            return;
        }

        const form = this.userFormGroup;
        for (const field in this.formErrors) {
            let errMsgs: string = '';
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                    errMsgs = messages[key];
                    this.toast = {
                        body: errMsgs,
                        type: 'error',
                        title: field
                    };
                    this.showToast();
                }
            }
        }
    }

    showToast() {
        this.toastRef = this.toasterService.showToast(this.toast);
    }

    hideToast() {
        this.toasterService.hideToast();
    }

    register(model: IUsers, isValid: boolean) {
        this.isSubmit = true;// Set our navigation extras object
        // that passes on our global query params and fragment
        this.toast = {
            type: 'success',
            title: 'success',
            body: 'Successfully registered',
            onHideCallback: (toast) => this.closeDialogAndRedirect,
            timeout: 1000,
            showCloseButton: false
        };
        this.showToast();
    }

    closeDialogAndRedirect() {
        this.dialogRef.close();
        let navigationExtras: NavigationExtras = {
            preserveFragment: true,
            queryParams: { isLoggedIn: true },
        };
        //Redirect the User
        this.router.navigate(['/LandingScreen'], navigationExtras);
    }

    checkUsernameAvailability() {
        this.toast = {
            body: 'UserName not available',
            type: 'warning',
            title: 'Warning'
        }
        this.showToast();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}