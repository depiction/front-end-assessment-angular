import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LaunchService } from './services/launch.service';

import { AppComponent } from './app.component';
import { LaunchTableComponent } from './launch-table/launch-table.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule
	],
	declarations: [
		AppComponent,
		LaunchTableComponent
	],
	providers: [
		LaunchService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
