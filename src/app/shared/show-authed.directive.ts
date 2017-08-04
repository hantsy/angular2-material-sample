import { Directive, ElementRef, Input, Renderer, HostBinding, Attribute, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../core/auth.service';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {

  @Input() appShowAuthed: boolean;
  sub: Subscription;

  constructor(private authService: AuthService, private el: ElementRef, private renderer: Renderer) {
    console.log('[appShowAuthed] value:' + this.appShowAuthed);
  }

  ngOnInit() {
    console.log('[appShowAuthed] ngOnInit:');
    this.sub = this.authService.currentUser().subscribe((res) => {
      if (res) {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }

      } else {
        if (this.appShowAuthed) {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        } else {
          this.renderer.setElementStyle(this.el.nativeElement, 'display', 'inherit');
        }
      }
    });
  }

  ngOnDestroy() {
    console.log('[appShowAuthed] ngOnDestroy:');
    if (this.sub) { this.sub.unsubscribe(); }
  }

}

// import {
//   Directive,
//   Input,
//   OnInit,
//   TemplateRef,
//   ViewContainerRef
// } from '@angular/core';

// import { UserService } from './services/user.service';

// @Directive({ selector: '[showAuthed]' })
// export class ShowAuthedDirective implements OnInit {
//   constructor(
//     private templateRef: TemplateRef<any>,
//     private userService: UserService,
//     private viewContainer: ViewContainerRef
//   ) {}

//   condition: boolean;

//   ngOnInit() {
//     this.userService.isAuthenticated.subscribe(
//       (isAuthenticated) => {
//         if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
//           this.viewContainer.createEmbeddedView(this.templateRef);
//         } else {
//           this.viewContainer.clear();
//         }
//       }
//     )
//   }

//   @Input() set showAuthed(condition: boolean) {
//     this.condition = condition;
//   }

// }
