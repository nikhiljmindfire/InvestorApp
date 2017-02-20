import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, OverlayContainer } from '@angular/material';
import { Ng2BootstrapModule,ButtonsModule } from '../../node_modules/ng2-bootstrap/ng2-bootstrap';
import { ToasterModule, ToasterService } from '../../node_modules/angular2-toaster';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import * as Modules from './Modules';
import { DialogServices } from './Services/DialogServices/DialogServices';

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MaterialModule.forRoot(),
    ToasterModule,
  ],
  declarations: [AppComponent,
    Modules.RegistrationComponent,
    Modules.LoginComponent,
    Modules.ForgetPasswordComponent,
    Modules.LandingScreenComponent,
    Modules.HomeComponent,
    // Modules.DialogComponent,
    // Modules.DialogAnchorDirective
  ],
  entryComponents : [],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})

export class AppModule { }