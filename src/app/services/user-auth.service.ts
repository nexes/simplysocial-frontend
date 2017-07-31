import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export interface AuthResponse {
    code: number;
    message: string;
    userid: number;
}

export interface User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}

@Injectable()
export class UserAuthService {
    private baseURL: string;
    private headers: HttpHeaders;
    private csrftoken: string;


    constructor(private http: HttpClient) {
        this.baseURL = 'http://localhost:8000/snaplife/api/auth/';
        this.headers = new HttpHeaders();
        const cookie = document.cookie;

        // only call out to our server if we don't have the csrf token set
        if (!cookie.includes('csrftoken')) {
            this.ensureCSRFToken();
        } else {
            if (cookie.indexOf(';') === -1) {
                this.csrftoken = cookie.substring(cookie.indexOf('csrftoken=') + 'csrftoken='.length);
            } else {
                this.csrftoken = cookie.substring(
                    document.cookie.indexOf('csrftoken=') + 'csrftoken='.length,
                    document.cookie.indexOf(';')
                );
            }
            this.headers = this.headers.set('X-CSRFToken', this.csrftoken);
        }
    }

    private ensureCSRFToken() {
        const req = this.http.get(this.baseURL + 'csrftoken/').subscribe(
            data => { },
            (err) => { /*this url will always return a status_code 200. This just ensures the browser has our csrf token*/ },
            () => {
                const cookie = document.cookie;

                if (cookie.indexOf(';') === -1) {
                    this.csrftoken = cookie.substring(cookie.indexOf('csrftoken=') + 'csrftoken='.length);
                } else {
                    this.csrftoken = cookie.substring(
                        document.cookie.indexOf('csrftoken=') + 'csrftoken='.length,
                        document.cookie.indexOf(';')
                    );
                }
                this.headers = this.headers.set('X-CSRFToken', this.csrftoken);
            }
        );
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

    newUser(user: User): Observable<AuthResponse> {
        const url = this.baseURL + 'user/create/';
        console.log(this.headers);

        return this.http.post<AuthResponse>(url, user, { headers: this.headers });
    }
}
