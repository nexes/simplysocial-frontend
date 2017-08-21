import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserDataService } from '../services/user-data.service';
import { CSRFToken } from '../util/securitycsrf';


export interface Post {
    postid: number;
    message: string;
    title?: string;
    views: number;
    likes: number;
    imageurl?: string;
    date: string;
}

@Injectable()
export class UserPostService extends CSRFToken {
    private baseURL: string;
    private postMessage: string;
    private postImage: string;


    constructor(private userData: UserDataService, private http: HttpClient) {
        super(http);
        this.baseURL = 'http://localhost:8000/snaplife/api/user/posts/';
    }

    createPost(message: string, b64Image?: string): Observable<Post> {
        const user_id = this.userData.getCurrentUserID();

        return this.http.post<Post>(this.baseURL + 'create/', {
            userid: user_id,
            message: message,
            image: b64Image
        }, { headers: this.headers });
    }

    getUserPosts(): Observable<Post> {
        const user_id = this.userData.getCurrentUserID();
        const url = `${this.baseURL}search/user/${this.userData.getCurrentUserID()}/${10}/`;

        return this.http.get<Post>(url);
    }

    updateLikeCount(post: Post): Observable<any> {
        return this.http.post(this.baseURL + 'like/', {
            userid: this.userData.getCurrentUserID(),
            postid: post.postid
        }, { headers: this.headers });
    }
}
