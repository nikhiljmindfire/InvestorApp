import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef, MdDialogClose, MdDialogActions, MdDialogContent, MdSnackBarModule } from '@angular/material';

import { IUsers,IDialog } from '../../../DTO';
import { RegistrationComponent } from '../RegistrationComponent/RegistrationComponent';
import { ForgetPasswordComponent } from '../ForgetPasswordComponent/ForgetPasswordComponent'
import { AuthService, DialogServices } from '../../../Services';
import { matchPasswords, emailValidator, charOnly, alphaNumeric, passwordMatch } from '../../../Validator/Validation';

//decorator
@Component({
    moduleId: module.id,
    templateUrl: './Template/LoginComponent.html',
    providers: [AuthService, DialogServices],
})

export class LoginComponent {
    public isLoggedIn: boolean;
    public userFormGroup: FormGroup;
    public auth: AuthService;
    public events: any[] = [];
    message: string;
    dialogRef: MdDialogRef<LoginComponent>;
    dialogConfig: IDialog = {
        DisableClosed: true,
        Width: '500px',
        Height: 'auto'
    };
    constructor(private fg: FormBuilder,
        public authService: AuthService,
        public router: Router,
        public diaRef: MdDialogRef<any>,
        private dialogService: DialogServices,
        public viewContainerRef: ViewContainerRef, ) {
        this.auth = authService;
        this.dialogRef = diaRef;
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef = null;
        });
    }

    ngOnInit() {
        this.userFormGroup = this.fg.group({
            UserName: [''],
            Password: ['']
        });
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
        console.log(this.message);
        console.log(this.authService.isLoggedIn);
    }

    login() {
        this.message = 'Trying to log in ...';
        this.authService.login().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home/LandingScreen';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    preserveFragment: true,
                    queryParams: { isLoggedIn: true },
                };

                this.dialogRef.close();
                // Redirect the User
                this.router.navigate([redirect], navigationExtras);
            }
        });
    }

    forgetPassword() {
        this.dialogService.openDialog(ForgetPasswordComponent, this.dialogConfig);
    }

    signUp() {
        this.dialogService.openDialog(RegistrationComponent, this.dialogConfig);
    }
}   