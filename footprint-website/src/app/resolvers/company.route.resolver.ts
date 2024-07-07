
import {ActivatedRouteSnapshot,ResolveFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../core/services/http.service';


export const CompanyRouteResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> =>
    {
      return inject(HttpService).getCompany()
    };

