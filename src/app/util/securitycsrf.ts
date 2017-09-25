import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


export abstract class CSRFToken {
    protected headers: HttpHeaders;
    protected csrftoken: string;

    constructor(http: HttpClient) {
        const cookie = document.cookie;
        this.headers = new HttpHeaders();

        // only call out to our server if we don't have the csrf token set
        if (!cookie.includes('csrftoken')) {
            this.ensureCSRFToken(http);
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

    private ensureCSRFToken(http: HttpClient) {
        const baseURL = `${environment.api}snaplife/api/auth/`;

        const req = http.get(baseURL + 'csrftoken/').subscribe(
            (data: any) => { },
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
}
