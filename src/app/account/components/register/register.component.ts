import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { PasswordValidator } from '../../password-validetor'
import { AccountService } from '../../services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  public errorMessage: string;

  constructor(
    private fb:FormBuilder, 
    private accountService: AccountService, 
    private nav: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.createRegisterForm();
  }


  createRegisterForm() {

    this.registerForm = this.fb.group(
      {
        userName: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
        passwordconfirm: ['',Validators.required]
      },
      {validator: PasswordValidator.passwordValidator}
    );
  }


  onRegistrer() {
    console.log(this.registerForm.controls['email'].value)
    console.log(this.registerForm)

    if (this.registerForm.invalid) { // protecting hacking by manualy access the form from devtools 
      return;
    }

    const userName = this.registerForm.controls['userName'].value;
    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    console.log(userName,email,password)

    this.accountService.registerUser(userName, email, password)
      .subscribe(user => {
          console.log(user)
          this.registerForm.reset();
          this.toastr.success('You have been successfully registered!')
          this.nav.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.error)
          this.errorMessage = error.error.error.details;
          this.toastr.error(this.errorMessage);
          this.registerForm.controls['email'].reset();
        }
      );
  }

  
}
