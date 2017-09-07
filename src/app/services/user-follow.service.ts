import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CSRFToken } from '../util/securitycsrf';



@Injectable()
export class UserFollowService extends CSRFToken {
    private baseURL: string;


    constructor(private http: HttpClient) {
        super(http);
        this.baseURL = 'http://localhost:8000/snaplife/api/user/search/user/';
    }

    searchForUser(username: string): Observable<any> {
        const url = `${this.baseURL}${username}/`;
        return this.http.get(url);
    }
}
