import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  standalone: true,
  selector: 'app-breadcrumb',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class BreadcrumbComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  breadcrumbs$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.buildBreadcrumbs(this.route.root))
  );

  private buildBreadcrumbs(
  route: ActivatedRoute,
  url: string = '',
  breadcrumbs: Breadcrumb[] = []
): Breadcrumb[] {

  const routeConfig = route.routeConfig;

  if (routeConfig?.data?.['breadcrumb']) {
    breadcrumbs.push({
      label: routeConfig.data['breadcrumb'],
      url: url || '/',
    });
  }

  for (const child of route.children) {
    const routeURL = child.snapshot.url
      .map(segment => segment.path)
      .join('/');

    const nextUrl = routeURL ? `${url}/${routeURL}` : url;

    return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
  }

  return breadcrumbs;
}

}
