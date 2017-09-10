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

    logoff(userid: number): Observable<AuthResponse> {
        const url = this.baseURL + 'user/logoff/';
        const data = { userid: userid };
        return this.http.post<AuthResponse>(url, data, { headers: this.headers });
    }

    newUser(user: CurrentUser): Observable<AuthResponse> {
        const url = this.baseURL + 'user/create/';
        return this.http.post<AuthResponse>(url, user, { headers: this.headers });
    }

    deleteUser(username: string, password: string): Observable<AuthResponse> {
        const url = this.baseURL + 'user/delete/';
        return this.http.post<AuthResponse>(url, {
                username: username,
                password: password
            }, {headers: this.headers});
    }

    isOnline(username: string): Observable<AuthResponse> {
        const url = `http://localhost:8000/snaplife/api/user/online/${username}/`;
        return this.http.get<AuthResponse>(url);
    }

    getUserProfileData(userID: number): Observable<CurrentUser> {
        const url = `http://localhost:8000/snaplife/api/user/account/snapshot/${userID}/`;
        return this.http.get<CurrentUser>(url);
    }

    userEmail(userid: number, email?: string, update = false): Observable<CurrentUser> {
        if (update && email) {
            const emailUrl = `http://localhost:8000/snaplife/api/user/email/`;

            return this.http.post<CurrentUser>(emailUrl, {
                userid: userid,
                email: email
            }, { headers: this.headers });
        }

        const url = `http://localhost:8000/snaplife/api/user/email/${userid}/`;
        return this.http.get<CurrentUser>(url);
    }

    userDescription(userid: number, description?: string, update = false): Observable<CurrentUser> {
        if (update && description) {
            const descUrl = `http://localhost:8000/snaplife/api/user/description/`;

            return this.http.post<CurrentUser>(descUrl, {
                userid: userid,
                description: description
            }, { headers: this.headers });
        }

        const url = `http://localhost:8000/snaplife/api/user/description/${userid}/`;
        return this.http.get<CurrentUser>(url);
    }

    userAvatar(userid: number, avatarImg?: string, update = false): Observable<CurrentUser> {
        if (update && avatarImg) {
            const avatarUrl = `http://localhost:8000/snaplife/api/user/profile/update/`;

            return this.http.post<CurrentUser>(avatarUrl, {
                userid: userid,
                profilepic: avatarImg.substring(avatarImg.indexOf('base64,') + 'base64,'.length)
            }, { headers: this.headers });
        }
    }
}
