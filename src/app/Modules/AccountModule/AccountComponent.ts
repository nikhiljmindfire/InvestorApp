import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { RegistrationComponent } from './RegistrationComponent/RegistrationComponent';
import { LoginComponent } from './LoginComponent/LoginComponent';
import { ForgetPasswordComponent } from './ForgetPasswordComponent/ForgetPasswordComponent';

@Component({
  template: `
    <div>
      <h2>Lets dynamically create some components!</h2>
      <button (click)="createHelloWorldComponent()">Create Hello World</button>
      <button (click)="createWorldHelloComponent()">Create World Hello</button>
      <dynamic-component [componentData]="componentData"></dynamic-component>
    </div>
  `,
})

export class App {
  componentData = null;

  createHelloWorldComponent(){
    this.componentData = {
      component: RegistrationComponent,
      inputs: {
        showNum: 9
      }
    };
  }
  
  createWorldHelloComponent(){
    this.componentData = {
      component: LoginComponent,
      inputs: {
        showNum: 2
      }
    };
  }
}