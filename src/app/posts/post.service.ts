import { Injectable, Inject } from '@angular/core';
import { HttpInterceptorService } from '@covalent/http';
import { Post } from './post.model';
import { Comment } from './comment.model';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app.config';

@Injectable()
export class PostService {

  private path = '';

  constructor(
    @Inject(APP_CONFIG) private _config: AppConfig,
    private _http: HttpInterceptorService
  ) {
    this.path = this._config.baseApiUrl + '/posts';
  }

  getPosts(term?: any): Observable<any> {
    return this._http.get(`${this.path}`, term);
  }

  getPost(id: number): Observable<any> {
    return this._http.get(`${this.path}/${id}`);
  }

  savePost(data: Post) {
    console.log('saving post:' + data);
    return this._http.post(`${this.path}`, data);
  }

  updatePost(id: number, data: Post) {
    console.log('updating post:' + data);
    return this._http.put(`${this.path}/${id}`, data);
  }

  deletePost(id: number) {
    return this._http.delete(`${this.path}/${id}`);
  }

  saveComment(id: number, data: Comment) {
    return this._http.post(`${this.path}/${id}/comments`, data);
  }

  getCommentsOfPost(id: number) {
    return this._http.get(`${this.path}/${id}/comments`);
  }

}
