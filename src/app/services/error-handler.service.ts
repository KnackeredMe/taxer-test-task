import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  public handleError(error: Error): Observable<any> {
    this.openSnackBar(error.message, 'OK')
    throw error;
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {panelClass: 'error-dialog', duration: 4000});
  }
}
