import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbService } from '../../../shared/ui/breadcrumb.service';
import { toObservable } from '@angular/core/rxjs-interop';

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
  breadcrumbService = inject(BreadcrumbService);

  breadcrumbs$ = combineLatest([
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => ({
        breadcrumbs: this.buildBreadcrumbs(this.route.root),
        allowDynamic: this.isDynamicBreadcrumbRoute(this.route.root),
      })),
    ),
    toObservable(this.breadcrumbService.lastLabelOverride).pipe(startWith(null)),
  ]).pipe(
    map(([routeData, override]) => {
      const { breadcrumbs, allowDynamic } = routeData;

      // 🚨 se a rota não permite breadcrumb dinâmico
      if (!allowDynamic) {
        return breadcrumbs;
      }

      if (!override || breadcrumbs.length === 0) {
        return breadcrumbs;
      }

      return [...breadcrumbs.slice(0, -1), { ...breadcrumbs.at(-1)!, label: override }];
    }),
  );

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;

    if (routeConfig?.data?.['breadcrumb']) {
      breadcrumbs.push({
        label: routeConfig.data['breadcrumb'],
        url: url || '/',
      });
    }

    for (const child of route.children) {
      const routeURL = child.snapshot.url.map((segment) => segment.path).join('/');

      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  private isDynamicBreadcrumbRoute(route: ActivatedRoute): boolean {
    if (route.snapshot.data?.['dynamicBreadcrumb']) {
      return true;
    }

    return route.children.some((child) => this.isDynamicBreadcrumbRoute(child));
  }
}
