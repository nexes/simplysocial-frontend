import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CSRFToken } from '../util/securitycsrf';
import { UserDataService } from '../services/user-data.service';



export interface FollowUser {
    username: string;
    avatar: string;
}

@Injectable()
export class UserFollowService extends CSRFToken {
    private baseSearchURL: string;
    private baseFollowURL: string;
    private baseUnfollowURL: string;


    constructor(private http: HttpClient, private userData: UserDataService) {
        super(http);
        this.baseSearchURL = 'http://localhost:8000/snaplife/api/user/search/user/';
        this.baseFollowURL = 'http://localhost:8000/snaplife/api/user/follow/';
    }

    searchForUser(username: string): Observable<any> {
        const url = `${this.baseSearchURL}${username}/`;
        return this.http.get(url);
    }

    followUser(username: string): Observable<any> {
        const data = {
            userid: this.userData.userID,
            username: username
        };
        return this.http.post(`${this.baseFollowURL}new/`, data, { headers: this.headers });
    }

    unFollowUser(username: string): Observable<any> {
        const data = {
            userid: this.userData.userID,
            username: username
        };
        return this.http.post(`${this.baseFollowURL}remove/`, data, { headers: this.headers });
    }

    followList(): Observable<FollowUser> {
        return this.http.get<FollowUser>(`${this.baseFollowURL}list/${this.userData.userID}/`);
    }

    getFriendTimeline(username: string): Observable<any> {
        const url = `http://localhost:8000/snaplife/api/user/friend/snapshot/${username}/`;
        return this.http.get(url);
    }
}
