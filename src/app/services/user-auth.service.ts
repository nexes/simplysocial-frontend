import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CSRFToken } from '../util/securitycsrf';
import { CurrentUser } from '../services/user-data.service';


export interface AuthResponse {
    code: number;
    message: string;
    userid: number;
    loggedin?: boolean;
    firstname?: string;
    lastname?: string;
}

@Injectable()
export class UserAuthenticationService extends CSRFToken {
    private baseURL: string;

    constructor(private http: HttpClient) {
        super(http);
        this.baseURL = 'http://localhost:8000/snaplife/api/auth/';
    }

    login(username: string, password: string): Observable<AuthResponse> {
        const url = this.baseURL + 'user/login/';
        const data = {
            username: username,
            password: password
        };
        return this.http.post<AuthResponse>(url, data, { headers: this.headers });
    }

    logoff(username: string): Observable<AuthResponse> {
        // TODO: logoff
        return null;
    }

    newUser(user: CurrentUser): Observable<AuthResponse> {
        const url = this.baseURL + 'user/create/';
        return this.http.post<AuthResponse>(url, user, { headers: this.headers });
    }

    isOnline(username: string): Observable<AuthResponse> {
        const url = `http://localhost:8000/snaplife/api/user/online/${username}/`;
        return this.http.get<AuthResponse>(url);
    }

    getUserProfileData(userID: number): Observable<CurrentUser> {
        const url = `http://localhost:8000/snaplife/api/user/account/snapshot/${userID}/`;
        return this.http.get<CurrentUser>(url);
    }

    setUserProfileData(username: string) {

    }
}
