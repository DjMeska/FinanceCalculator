import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment } from 'src/app/Types/payment';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data =data.data;
    this.action = data.action;
  }

  doAction(){
    this.dialogRef.close(this.local_data);
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
