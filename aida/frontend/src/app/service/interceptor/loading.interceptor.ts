import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/component/basic/modal-dialog/modal-dialog.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService, public dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa("username" + ':' + "password")
    });
    const clonedRequest = request.clone({ headers: headers });
    return next.handle(clonedRequest)
      .pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = ''
          if (error.status != 403) {
            errorMsg = 'Errore durante l\'\operazione.';
          } else {
            errorMsg = 'Non sei autorizzato ad accedere alla sezione.'
          }
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '220px'
          dialogConfig.width = '600px'
          dialogConfig.panelClass = 'full-screen-modal'
          dialogConfig.data = {
            title: 'Errore',
            message: errorMsg,
            class: 'error-class'
          };
          this.dialog.open(ModalDialogComponent, dialogConfig)
          return throwError(errorMsg);
        })
      )
  }
}