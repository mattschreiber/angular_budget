import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {UserloginService } from '../services/userlogin.service';
import { AuthService } from '../services/auth.service';

import { User, Token } from '../shared/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private userloginservice: UserloginService,
   private router: Router, private authservice: AuthService) {
    this.createForm();
   }

   createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.user = this.loginForm.value;
    this.userloginservice.loginUser(this.user).subscribe(data => {
    this.authservice.setToken(data.token)
    this.router.navigate(['/home']);
  },
  (err: HttpErrorResponse) => {
    this.loginForm.reset();
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
      }
    }
  );
  }

  ngOnInit() {
  }

}
