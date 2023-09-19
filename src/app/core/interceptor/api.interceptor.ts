import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '@shared/constants/app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class ApiIntereptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userObject = localStorage.getItem(AppConstants.KEY_USER_DATA);
        if (!userObject || req.headers.get('no-auth')) {
            return next.handle(req);
        } else {
            const user = JSON.parse(userObject);
            const newReq = req.clone({
                headers: req.headers.set(
                    'Authorization', 'JWT ' + user.token
                )
            });
            return next.handle(newReq);
        }

      
    }
}
