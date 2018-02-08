import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LaunchTableComponent } from './launch-table/launch-table.component';
import { LaunchService } from './services/launch.service';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				LaunchTableComponent
			],
			providers: [HttpClient, HttpHandler, LaunchService]
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
