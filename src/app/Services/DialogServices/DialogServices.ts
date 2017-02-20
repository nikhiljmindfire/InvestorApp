import { Injectable, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { IDialog } from '../.././DTO/DialogDTO/DialogDto';
import { RegistrationComponent } from '../../Modules'

@Injectable()

export class DialogServices{
    dialogConfig: IDialog = { DisableClosed: true, Height: 'auto', Width: '500px' };
    constructor(public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
            viewContainerRef.clear();
    }

    openDialog<T>(component: any, dialogConfig: IDialog = null) {
         this.viewContainerRef.clear();
        if (dialogConfig != null)
            this.dialogConfig = dialogConfig;
        this.dialog.closeAll();

        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        config.height = this.dialogConfig.Height;
        config.width = this.dialogConfig.Width;
        config.disableClose = this.dialogConfig.DisableClosed;

        this.dialog.open(component, config);
    }
}
