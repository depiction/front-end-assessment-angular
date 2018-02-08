import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Launch, Reuse } from '../models/launch';
import { LaunchService } from '../services/launch.service';
import { isRegExp } from 'util';

@Component({
	selector: 'app-launch-table',
	templateUrl: './launch-table.component.html',
	styleUrls: ['./launch-table.component.scss']
})

export class LaunchTableComponent implements OnInit {

	public filteredLaunches: Array<Launch>;
	public launches: Array<Launch>;
	public sortType: string = 'desc';
	public showNotification: boolean = false;
	public loaded: boolean = false;
	public serviceError: boolean = false;
	public filterOptions = [
		{
			name: 'Land Success',
			value: 'launch_success'
		},
		{
			name: 'Reused',
			value: 'reused'
		},
		{
			name: 'With Reddit',
			value: 'reddit'
		}
	];
	public checkedFilters = [];

	constructor(private launchService: LaunchService) { }

	ngOnInit() {
		this.getLaunches();
	}

	getLaunches(notify: boolean = false): void {
		const sortMethod = this.getSortMethod();

		this.launchService.getLaunches()
			.map(launch => launch.sort(sortMethod))
			.finally(() => {
				this.loaded = true;
			})
			.subscribe(launches => {
				this.launches = launches;
				this.showNotification = (notify) ? true : false;
				this.filter(this.launches, this.checkedFilters);

				if (notify) {
					setTimeout(() => {
						this.showNotification = false;
					}, 1500);
				}
			}, error => {
				this.serviceError = true;
			});
	}

	toggleSort() {
		this.sortType = (this.sortType === 'asc') ? 'desc' : 'asc';

		const sortMethod = this.getSortMethod();

		this.launches.sort(sortMethod);

		if(this.filteredLaunches) {
			this.filteredLaunches.sort(sortMethod);
		}
	}

	getSortMethod() {
		return (this.sortType === 'asc') ? this.launchService.sortAscending : this.launchService.sortDescending;
	}

	updateFilters(option, event) {
		if (event.target.checked) {
			this.checkedFilters.push(option.value);
		} else {
			this.filterOptions.forEach((item, index) => {
				if (this.checkedFilters[index] == option.value) {
					this.checkedFilters.splice(index, 1);
				}
			})
		}

		this.filteredLaunches = this.filter(this.launches, this.checkedFilters);
	}

	filter(launches: Array<Launch>, checkedFilters: Array<any>) {
		if(checkedFilters.length) {
			return launches.filter(launch => {
				let matches = [];

				for(let filter of checkedFilters) {
					if(filter === 'launch_success') {
						if(launch.launch_success) {
							matches.push(true);
						}
					}

					if(filter === 'reused') {
						// convert reused object values into an array
						const reused = Object.values(launch.reuse);

						// add match if array contains any true values
						if(reused.find(reuse => (reuse === true))) {
							matches.push(true);
						}
					}

					if(filter === 'reddit') {
						// convert links object keys into an array
						const links = Object.keys(launch.links);
						let match;

						// set match to true if launch has at least one reddit link prop that isn't null
						for(let link of links) {
							if(link.search(/reddit/i) === 0) {
								if(launch.links[link] != null) {
									match = true;
								}
							}
						}

						if(match) {
							matches.push(true);
						}
					}
				}

				return (matches.length === checkedFilters.length);
			});
		} else {
			return null;
		}
	}
}
