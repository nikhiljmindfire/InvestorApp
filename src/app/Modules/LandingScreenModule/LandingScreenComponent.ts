import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '../../../../node_modules/angular2-toaster/toaster.css'

@Component({
    moduleId:module.id,
    templateUrl: './Template/LandingScreen.html',
    styleUrls:['../../../../node_modules/angular2-toaster/toaster.css']
})

export class LandingScreenComponent {
    
    constructor(private route: ActivatedRoute) {}
        
}