import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = 'http://localhost:5072/api/receipts';
  fileUrl = 'http://localhost:5072';
  constructor(private http: HttpClient) { }

  getReceipts(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getReceipt(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createReceipt(obj: any): Observable<any> {
    return this.http.post(this.apiUrl, obj)
      .pipe(catchError(this.handleError));
  }

  updateReceipt(id: number, obj: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, obj)
      .pipe(catchError(this.handleError));
  }

  deleteReceipt(id: number): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
