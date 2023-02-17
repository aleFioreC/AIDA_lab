import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
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
    return next.handle(request)
      .pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
            title: 'Errore!',
            message: errorMsg
          };
          this.dialog.open(ModalDialogComponent, dialogConfig);
          return throwError(errorMsg);
        })
      )
  }
}