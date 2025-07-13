import { Component, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Translation } from './shared/services/translation/translation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private router: Router,
    private titleService: Title,
    private translationService: Translation
  ) {
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
        })
      )
      .subscribe((title: string) => {
        if (title) {
          if (title === 'APP.TITLE') {
            this.titleService.setTitle(
              this.translationService.instant('APP.TITLE')
            );
          } else {
            this.titleService.setTitle(
              `${this.translationService.instant(
                title
              )} - ${this.translationService.instant('APP.TITLE')}`
            );
          }
        }
      });
  }
}
