import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.signInForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.authService.signInUser(email,password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error)=>{
        this.errorMessage = error;
      }
    )
  }

}
