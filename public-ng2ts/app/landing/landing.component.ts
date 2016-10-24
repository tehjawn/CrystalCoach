declare var require: any
import { Component } from '@angular/core';
import { Firebase } from 'firebase';
 
@Component({
	selector: 'my-app',
	template: '<h1>{{title}}</h1>{{hero}}'
})

export class LandingComponent {

	title="Something"
	hero="Windstorm"

}