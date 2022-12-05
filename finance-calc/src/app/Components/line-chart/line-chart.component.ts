import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentService } from 'src/app/Core/Services/Payments/payment.service';
import { IPayment } from 'src/app/Types/payment';
import { IPaymentResponse } from 'src/app/Types/paymentResponse';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  public chart: any;
  public monthChart: any = [];
  public payments: IPayment[];
  private readonly _unsubscribeSub: Subject<void>;

  constructor(
    private readonly paymentService: PaymentService,
  ) {
    this._unsubscribeSub = new Subject<void>();
    this.paymentService.getAllPayments()
    .pipe(takeUntil(this._unsubscribeSub))
    .subscribe((x) => {
      this.payments = x.items;
      this.payments = this.paymentService.sortByDate(this.payments);
      this.createChart();
    });
   }


  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.payments.map(row => row.date),
	       datasets: [
          {
            label: "Price",
            data: this.payments.map(row => row.price),
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio:1.5,
        plugins: {
          title: {
              display: true,
              text: 'My chart all data'
          }
      }
      }

    });
  }

  monthCharts(monthData: any){
    let index = 0;
    for (const value of Object.values(monthData)) {
        const data = value as any
        this.monthChart.push(new Chart(index.toLocaleString(), {
          type: 'line',
          data: {
            labels: data.map((row: IPayment) => row.date),
             datasets: [
              {
                label: "Price",
                data: data.map((row: IPayment) => row.price),
                backgroundColor: 'blue'
              },
            ]
          },
          options: {
            aspectRatio:1.5,
            plugins: {
              title: {
                  display: true,
                  text: 'My chart all data'
              }
            }
          }
        }
        )
        );
        index++;
    }

  }

  chartsByMonth() {
    const monthData = this.paymentService.groupByMonth(this.payments);
    //this.monthCharts(monthData);
  }

}

