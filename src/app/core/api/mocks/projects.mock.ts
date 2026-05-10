import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ACTIVE_PROJECTS } from '../../../features/dashboard/data/projects.data';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/api/v1/projects') && req.method === 'GET') {
            return of(
              new HttpResponse({
                status: 200,
                body: ACTIVE_PROJECTS,
              })).pipe(delay(800))
        }
        return next.handle(req)
    }
}
