import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LaunchService } from '../services/launch.service';

import { LaunchTableComponent } from './launch-table.component';

describe('LaunchTableComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [LaunchService, LaunchTableComponent]
		});
	});

	it('should apply reused filter', inject([LaunchTableComponent, LaunchService], (launchTableComponent: LaunchTableComponent, launchService: LaunchService) => {
		const launchesFixture = window['__fixtures__']['src/app/fixtures/launches']
		const reusedFixture = window['__fixtures__']['src/app/fixtures/launch-reused']

		expect(launchTableComponent.filter(launchesFixture, ['reused'])).toEqual(reusedFixture);
	}))

	it('should apply launch_success filter', inject([LaunchTableComponent, LaunchService], (launchTableComponent: LaunchTableComponent, launchService: LaunchService) => {
		const launchesFixture = window['__fixtures__']['src/app/fixtures/launches']
		const launchSuccessFixture = window['__fixtures__']['src/app/fixtures/launch-success']

		expect(launchTableComponent.filter(launchesFixture, ['launch_success'])).toEqual(launchSuccessFixture);
	}))

	it('should apply reddit filter', inject([LaunchTableComponent, LaunchService], (launchTableComponent: LaunchTableComponent, launchService: LaunchService) => {
		const launchesFixture = window['__fixtures__']['src/app/fixtures/launches']
		const launchWithRedditFixture = window['__fixtures__']['src/app/fixtures/launch-with-reddit']

		expect(launchTableComponent.filter(launchesFixture, ['reddit'])).toEqual(launchWithRedditFixture);
	}))
});
