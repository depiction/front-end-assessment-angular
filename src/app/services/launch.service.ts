import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Launch } from '../models/launch';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LaunchService {
	public apiUrl = 'https://api.spacexdata.com/v2/launches';

	constructor(private http: HttpClient) { }

	public getLaunches(): Observable<Launch[]> {
		return this.http.get<Launch[]>(this.apiUrl);
	}

	public sortAscending(a: Launch, b: Launch) {
        if (a.launch_date_local > b.launch_date_local) {
            return 1;
        }
        if (a.launch_date_local < b.launch_date_local) {
            return -1;
        }
        return 0;
	}

	public sortDescending(a: Launch, b: Launch) {
        if (a.launch_date_local > b.launch_date_local) {
            return -1;
        }
        if (a.launch_date_local < b.launch_date_local) {
            return 1;
        }
        return 0;
	}

}
