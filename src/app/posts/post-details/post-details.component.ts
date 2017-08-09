import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';
import { Comment } from '../shared/comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  slug: string;
  post: Post = { title: '', content: '' };
  comments: Comment[] = [];
  sub: Subscription;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap(params => {
        this.slug = params['slug'];
        return Observable.forkJoin(this.postService.getPost(this.slug), this.postService.getCommentsOfPost(this.slug));
      }).subscribe((res: Array<any>) => {
        this.post = res[0];
        this.comments = res[1].content;
        console.log("post data:" + this.post + ", comments: " + this.comments);
      });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
