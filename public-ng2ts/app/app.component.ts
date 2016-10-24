declare var require: any
import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: '<h1>{{title}}</h1>{{hero}}'
})

export class AppComponent {

	title="Something"
	hero="Windstorm"

}