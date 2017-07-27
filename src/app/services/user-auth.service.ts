import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


interface AuthResponse {
    code: number;
    message: string;
    userid: number;
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
        if (cookie.length === 0) {
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

    ensureCSRFToken() {
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
}
