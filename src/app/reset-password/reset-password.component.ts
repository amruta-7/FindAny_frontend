import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { ResetPasswordModel } from '../models/reset-password';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  constructor(private route: ActivatedRoute, private toastr: ToastrService, private customerService: CustomerService, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
      }
    });
  }
  resetPassword(data: any) {
    let resetPasswordBody: ResetPasswordModel = { newPassword: data.newPassword, token: this.token };
    console.log(resetPasswordBody);
    this.customerService.resetPassword(resetPasswordBody)
      .subscribe((data) => {
        console.log(data);
        this.toastr.success("Password has been reset successfully. Please login again");
        this.router.navigate(['/login']);
      },
        error => {
          this.token = null;
          this.toastr.error(
            error.error?.message,
            null,
            {
              closeButton: true,
              timeOut: 5000,
              onActivateTick: true
            }
          );

        });
  }
  getPasswordResetToken(data: any) {
    this.customerService.getPasswordResetToken(data.email)
      .subscribe((data) => {
        this.toastr.success("Reset Link sent successfully.");
      },
        error => {
          this.toastr.error(
            error.error?.message,
            null,
            {
              closeButton: true,
              timeOut: 5000,
              onActivateTick: true
            }
          );
        });
  }
}