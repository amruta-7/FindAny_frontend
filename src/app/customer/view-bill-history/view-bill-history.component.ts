import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { saveAs as importedSaveAs } from "file-saver";
import { ToastrService } from 'ngx-toastr';
;
@Component({
  selector: 'app-view-bill-history',
  templateUrl: './view-bill-history.component.html',
  styleUrls: ['./view-bill-history.component.scss']
})
export class ViewBillHistoryComponent implements OnInit {
  bills: any[] = [];
  constructor(private toastr:ToastrService,private router: Router, private customerService: CustomerService) { }
  ngOnInit(): void {
    this.getAllBills();
  }
  getAllBills() {
    //fetches all the bills from customer service
    this.customerService.getAllBills()
      .subscribe((data) => {
        console.log(data);
        this.bills = data
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
  downloadBillPdf(billId: number) {
    //download bill of billId
    this.customerService.downloadBillPdf(billId).subscribe(
      data => {

        importedSaveAs(data, "bill_" + billId + ".pdf");
      }, error => {
        console.log(error);
        alert('Bill with id ' + billId + ' could not be downloaded.');
      }

    );

  }
  viewBillDetails(billId: number) {
    this.router.navigate(['/user/bills', billId]);
  }
  makePayment(billId: number, amount: number) {
    this.customerService.changeBillDetails(billId, amount);
    this.router.navigate(['/payment']);
  }
}
