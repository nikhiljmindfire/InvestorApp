import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginComponent, RegistrationComponent } from '../AccountModule';
import { AuthService } from '../../Services/AuthorizationServices/AuthorizationServices';
import { DialogServices } from '../../Services/DialogServices/DialogServices';
import { IDialog } from '../.././DTO';

@Component({
    moduleId: module.id,
    selector: 'home-app',
    templateUrl: './Template/HomeComponent.html',
    providers: [AuthService, DialogServices],
    encapsulation: ViewEncapsulation.None,
})

export class HomeComponent {
    isLoggedIn: Observable<boolean>;
    favicon: string;

    constructor(public authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        public viewContainerRef: ViewContainerRef,
        private dialogService: DialogServices) {
        this.isLoggedIn = Observable.create(false);
        this.favicon = './app/images/favicon.ico';
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.isLoggedIn = params['isLoggedIn'] || false);
    }

    openDialog(event: Event) {
        let dialogConfig: IDialog = {
            DisableClosed: true,
            Width: '500px',
            Height: 'auto'
        };

        let buttonClicked = event.srcElement.innerHTML.toLowerCase();
        if (buttonClicked == "login")
            this.dialogService.openDialog<LoginComponent>(LoginComponent, dialogConfig);
        if (buttonClicked == "signup")
            this.dialogService.openDialog(RegistrationComponent, dialogConfig);
    }
}