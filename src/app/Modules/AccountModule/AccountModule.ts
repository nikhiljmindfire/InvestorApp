import { NgModule } from '@angular/core';
import { RegistrationComponent, LoginComponent, ForgetPasswordComponent } from './';

@NgModule({
    declarations: [RegistrationComponent, LoginComponent, ForgetPasswordComponent],
    exports: [RegistrationComponent, LoginComponent, ForgetPasswordComponent]
})

export class AccountModule { }