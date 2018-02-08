import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { LaunchService } from './launch.service';

describe('LaunchService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [LaunchService]
		});
	});

	it('should be created', inject([LaunchService], (launchService: LaunchService) => {
		expect(launchService).toBeTruthy();
	}));

	it('should get launches', inject([HttpClient, HttpTestingController, LaunchService], (http: HttpClient, httpMock: HttpTestingController, launchService: LaunchService) => {
		let fixture = window['__fixtures__']['src/app/fixtures/launches']

		launchService.getLaunches().subscribe(
			data => expect(data).toBe(fixture),
			err => expect(err).not.toBeDefined()
		)
		// mock http response
		const req = httpMock.expectOne(launchService.apiUrl);

		expect(req.request.method).toEqual('GET');
		req.flush(fixture);

		httpMock.verify();
	}));

	it('should sort launches ascending', inject([LaunchService], (service: LaunchService) => {
		const launches = [
			{ flight_number: 1, launch_date_local: '2018-02-06T13:30:00-05:00'},
			{ flight_number: 2, launch_date_local: '2018-01-31T16:25:00-05:00'},
			{ flight_number: 3, launch_date_local: '2006-03-25T10:30:00+12:00'}
		];

		const sortedLaunches = [
			{ flight_number: 3, launch_date_local: '2006-03-25T10:30:00+12:00'},
			{ flight_number: 2, launch_date_local: '2018-01-31T16:25:00-05:00'},
			{ flight_number: 1, launch_date_local: '2018-02-06T13:30:00-05:00'}
		];

		expect(launches.sort(service.sortAscending)).toEqual(sortedLaunches);
	}));

	it('should sort launches descending', inject([LaunchService], (service: LaunchService) => {
		const launches = [
			{ flight_number: 1, launch_date_local: '2018-02-06T13:30:00-05:00'},
			{ flight_number: 2, launch_date_local: '2018-01-31T16:25:00-05:00'},
			{ flight_number: 3, launch_date_local: '2006-03-25T10:30:00+12:00'}
		];

		const sortedLaunches = [
			{ flight_number: 1, launch_date_local: '2018-02-06T13:30:00-05:00'},
			{ flight_number: 2, launch_date_local: '2018-01-31T16:25:00-05:00'},
			{ flight_number: 3, launch_date_local: '2006-03-25T10:30:00+12:00'}
		];

		expect(launches.sort(service.sortDescending)).toEqual(sortedLaunches);
	}));

});
