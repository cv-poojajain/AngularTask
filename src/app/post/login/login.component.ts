import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      uname: new FormControl('', Validators.required),
      psw: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    localStorage.setItem('user', this.loginForm.get('uname')?.value)
    this.router.navigateByUrl('/post/index');
  }

}
