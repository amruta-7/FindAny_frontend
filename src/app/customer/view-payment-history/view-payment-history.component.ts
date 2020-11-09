import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Payment } from 'src/app/models/payment';
import { saveAs as importedSaveAs } from "file-saver";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-payment-history',
  templateUrl: './view-payment-history.component.html',
  styleUrls: ['./view-payment-history.component.scss']
})
export class ViewPaymentHistoryComponent implements OnInit {

  payments: Payment[] = []
  customerId: any
  constructor(private toastr:ToastrService,private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllPayments();
  }
  getAllPayments() {
    //fetches all the payments form customer service
    this.customerService.getAllPayments()
      .subscribe((data) => {
        console.log(data);
        this.payments = data
      }, error => {
        this.toastr.error(
          error.error?.message,
          null,
          {
            closeButton: true,
            timeOut: 5000,
            onActivateTick: true
          }
        );
      })
  }
}