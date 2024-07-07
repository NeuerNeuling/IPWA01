
import {ActivatedRouteSnapshot,ResolveFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpService } from '../core/services/http.service';

/*
*Die beiden Oberservables werden zu einem Oberservable vereint
*/

export const OverviewRouteResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> =>
    {
      let join = [inject(HttpService).getCompany(), inject(HttpService).getCountry()];
      return forkJoin(join);
    }

