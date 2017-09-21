import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserDataService } from '../services/user-data.service';
import { CSRFToken } from '../util/securitycsrf';
import { environment } from '../../environments/environment';



export interface Comment {
    author: string;
    message: string;
    date: string;
}
export interface Post {
    postid: number;
    message: string;
    title?: string;
    views: number;
    likes: number;
    imageurl?: string;
    date: string;
    author: string;
    authoravatar: string;
    comments: Comment[];
}

@Injectable()
export class UserPostService extends CSRFToken {
    private baseURL: string;
    private baseCommentURL: string;
    private postMessage: string;
    private postImage: string;


    constructor(private userData: UserDataService, private http: HttpClient) {
        super(http);
        this.baseURL = `${environment.api}snaplife/api/user/posts/`;
    }

    createPost(message: string, b64Image?: string): Observable<Post> {
        const user_id = this.userData.userID;

        return this.http.post<Post>(this.baseURL + 'create/', {
            userid: user_id,
            message: message,
            image: b64Image
        }, { headers: this.headers });
    }

    getUserPosts(): Observable<Post> {
        const url = `${this.baseURL}search/user/${this.userData.userID}/${10}/`;
        return this.http.get<Post>(url);
    }

    updateLikeCount(post: Post): Observable<any> {
        return this.http.post(this.baseURL + 'like/', {
            userid: this.userData.userID,
            postid: post.postid
        }, { headers: this.headers });
    }

    commentOnPost(post: Post, message: string): Observable<any> {
        const url = `${this.baseURL}comment/create/`;
        const data = {
            postid: post.postid,
            userid: this.userData.userID,
            message: message
        };
        return this.http.post(url, data, { headers: this.headers });
    }

    reportPost(postid: number, reason: string, email: string): Observable<any> {
        const url = `${this.baseURL}report/`;
        const data = {
            postid: postid,
            reason: reason,
            email: email
        };
        return this.http.post(url, data, { headers: this.headers });
    }
}
