import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, ToasterContainerComponent, Toast } from 'angular2-toaster';

@Injectable()

export class ToastServices {
    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 0,
        preventDuplicates: true,
    });

    toastRef: Toast;
    toast: Toast;

    constructor(private toasterService: ToasterService){
    }

    showToast = function showToast(toast : Toast) {
        this.toastRef = this.toasterService.pop(toast);
        return this.toastRef;
    };

    hideToast = function hideToast() {
        this.toasterService.clear();
    };
}
