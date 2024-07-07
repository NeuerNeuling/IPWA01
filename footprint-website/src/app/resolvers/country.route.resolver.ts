
import {ActivatedRouteSnapshot,ResolveFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../core/services/http.service';


export const CountryRouteResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> =>
    {
      return inject(HttpService).getCountry()
    };

