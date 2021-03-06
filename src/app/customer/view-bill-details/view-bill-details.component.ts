import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-bill-details',
  templateUrl: './view-bill-details.component.html',
  styleUrls: ['./view-bill-details.component.css']
})
export class ViewBillDetailsComponent implements OnInit {
  bill: any;
  constructor(private toastr:ToastrService, private router: Router, private location: Location, private route: ActivatedRoute, private customerService: CustomerService) { }
  ngOnInit(): void {
    //fetches the bill Id from params and then fetches bill details from customer service
    this.route.params
      .pipe(switchMap((params: Params) => { return this.customerService.getBillDetails(params['id']); }))
      .subscribe((data) => {
        console.log(data);
        this.bill = data
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
        this.location.back();
        
      });

  }
  makePayment(billId: number, amount: number) {
    //makes payment of billId
    this.customerService.changeBillDetails(billId, amount);
    this.router.navigate(['/payment']);
  }

}
