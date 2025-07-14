import { Component, OnInit, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { Translation } from './shared/services/translation/translation';
import { Store } from './shared/services/store/store';
import { User as UserService } from './shared/services/user/user';

import { User } from './shared/models/User.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  onGetUser: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private translationService: Translation,
    private storeService: Store,
    private userService: UserService,
  ) {
    this.onGetUser = 'true';

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';

          while (route!.firstChild) {
            route = route.firstChild;
          }

          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }

          return routeTitle;
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          if (title === 'APP.TITLE') {
            this.titleService.setTitle(
              this.translationService.instant('APP.TITLE'),
            );
          } else {
            this.titleService.setTitle(
              `${this.translationService.instant(
                title,
              )} - ${this.translationService.instant('APP.TITLE')}`,
            );
          }
        }
      });
  }

  ngOnInit(): void {
    this.onGetUser = 'true';

    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.storeService.user = user;
        this.onGetUser = 'success';
      },
      error: () => {
        this.onGetUser = 'error';
      },
    });
  }
}
