import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { IPayment } from 'src/app/Types/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // IMPO methods that take no parameters and return Observables are better written as public member properties
  public readonly payments: Observable<IPayment[]>;

  private readonly _refreshSub: BehaviorSubject<void>;
  url: string =  'http://127.0.0.1:8090/api/collections/payments/records'

  constructor(private readonly http: HttpClient) {
    this._refreshSub = new BehaviorSubject<void>(undefined);

    this.payments = this._refreshSub.pipe(
      switchMap((): Observable<IPayment[]> => this.http.get<IPayment[]>(this.url)),
      // Replay the most recent (bufferSize) emission on each subscription
      // Keep the buffered emission(s) (refCount) even after everyone unsubscribes. Can cause memory leaks.
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  public createPayment(payload: any): Observable<IPayment> {
    return this.http.post<IPayment>(this.url, payload).pipe(
      tap((): void => { this._refreshSub.next(); }),
    );
  }

  public deletePaymentById(id: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id).pipe(
      tap((): void => { this._refreshSub.next(); }),
    );
  }

  public updatePaymentById(id: string, payload: Partial<IPayment>): Observable<IPayment> {
    return this.http.patch<IPayment>(this.url + '/' + id, payload).pipe(
      tap((): void => { this._refreshSub.next(); }),
    );
  }

}
