import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthenticationService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;

        if(token) {
            request = request.clone({
                setHeaders: { Authorization : `Bearer ${this.authService.token}`}
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                if(err instanceof HttpErrorResponse) {
                    if(err.status === 401){
                        console.log("Error 401");
                    }
                }
            return throwError(err);

            })
        )
    }

}