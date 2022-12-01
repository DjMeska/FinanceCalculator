import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { DialogBoxComponent } from 'src/app/Core/Common/DialogBox/dialog-box/dialog-box.component';
import { PaymentService } from 'src/app/Core/Services/Payments/payment.service';
import { IDialogResponse } from 'src/app/Types/dialogResponse';
import { IPayment } from 'src/app/Types/payment';
import { IPaymentResponse } from 'src/app/Types/paymentResponse';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnDestroy{

  public readonly payments: Observable<any>;
  emptyPayment = {} as IPaymentResponse;
  displayedColumns: string[] = ['category','payment','tag','price','date','action'];
  private readonly _unsubscribeSub: Subject<void>;

  constructor(
    private readonly paymentService: PaymentService,
    public dialog: MatDialog,
  ) {
      this._unsubscribeSub = new Subject<void>();
      this.payments = this.paymentService.payments;
    }

  public ngOnDestroy(): void {
    this._unsubscribeSub.next();
    this._unsubscribeSub.complete();
  }

  public getPaymentId(_: number, item: IPayment): string {
    return item.id;
  }

  openDialog(action: string, obj: IPaymentResponse) {
    const dialogData = {action: action, data: obj };
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: dialogData,
    });


    dialogRef.afterClosed().pipe(
      tap((result: IPayment): void => {
          if(action == 'Add'){
            this.addRowData(result);
          }else if(action == 'Update'){
            this.updateRowData(result);
          }else if(action == 'Delete'){
            this.deleteRowData(result);
          }
      }),
      takeUntil(this._unsubscribeSub)).subscribe()
  }

  addRowData(row_obj: IPayment){
    this.paymentService.createPayment(row_obj)
    .pipe(takeUntil(this._unsubscribeSub))
    .subscribe();
  }
  updateRowData(row_obj: IPayment){
    this.paymentService.updatePaymentById(row_obj.id, row_obj)
    .pipe(takeUntil(this._unsubscribeSub))
    .subscribe();

  }
  deleteRowData(row_obj: IPayment){
    this.paymentService.deletePaymentById(row_obj.id)
    .pipe(takeUntil(this._unsubscribeSub))
    .subscribe();
  }
}
