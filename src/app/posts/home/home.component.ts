import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post } from '../shared/post.model';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-posts-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PostsHomeComponent implements OnInit, OnDestroy {
  q = null;
  posts: Post[];
  sub: Subscription;
  viewModeIcon = 'list';

  constructor(private postService: PostService) {
  }

  search() {
    this.sub = this.postService.getPosts({ q: this.q }).subscribe(
      res => this.posts = res.content
    );
  }

  searchByTerm($event) {
    console.log('search by term:' + $event);
    this.updateTerm($event);
    this.search();
  }

  updateTerm($event) {
    console.log('update term:' + $event);
    this.q = $event;
  }

  clearTerm($event) {
    console.log('clear term:' + $event);
    this.q = null;
  }

  changeViewMode(icon) {
    this.viewModeIcon = icon;
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
