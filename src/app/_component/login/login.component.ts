import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustRegService } from '../../_services/cust-reg.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;

  public loginError = false;
  public loginPageShow = true;
  errorDesc: any;


  props: any;
  data: any;
  swal: any;
  isActive: any;


  constructor(
    private _router: Router,
    public fb: FormBuilder,
    private regCust: CustRegService,
    private appcomponent: AppComponent
  ) {
    this.formLogin = fb.group({
      username: [""],
      password: [""],
      action: [""],
      tabid: [""]

    });

  }

  ngOnInit(): void {

    this.appcomponent.login = false;
    localStorage.clear();
    var accessPage = { action: 'accessPage' };

    this.regCust.custRegValidation2(accessPage).subscribe(
      (response) => {

        if (response.status == "Success") {
          localStorage.setItem('tabid', response.tabid);
        } else {
          this.loginPageShow = false;
        }

      });

  }


  @HostListener('window:mouseup', ['$event'])
  mouseUp() {
    this.isActive = true
  }
  mouseDown() {
    this.isActive = false
  }


  forgotpass() {
    // swal("Admin!", "Forget password service is not configured , Kindly check with administator", "info");
    alert("Forget password service is not configured , Kindly check with administator");
  }


  submitLogin() {

    this.formLogin.controls['action'].setValue('login');
    this.formLogin.controls['tabid'].setValue(localStorage.getItem('tabid'));
    console.log(this.formLogin.value);
    this.regCust.custRegValidation2(this.formLogin.value).subscribe(
      (response) => {
        this.errorDesc = response.errorDesc;
        if (response.status == "Success") {
          var homerequest = { action: 'home', tabid: localStorage.getItem('tabid') };
          this.regCust.custRegValidation2(homerequest).subscribe(
            (response) => {
        // console.log(response);
              // this.appcomponent.login
              this.appcomponent.LastLoginOn = response.Profile.LastLoginOn;
              this.appcomponent.PasswordLockedOn = response.Profile.PasswordLockedOn;
              this.appcomponent.LoginId = response.Profile.LoginID;
              this.appcomponent.LoginName = response.Profile.FirstName;
              this.appcomponent.FailureCount = response.Profile.PasswordLockedCount;
              this.appcomponent.obj = response.Services;
              this.appcomponent.menuservice = this.appcomponent.obj;
              //  alert(this.appcomponent.LoginId);

              // localStorage.setItem('LastLoginOn',response.Profile.LastLoginOn);
              // localStorage.setItem('PasswordLockedOn',response.Profile.PasswordLockedOn);
              // localStorage.setItem('LoginName',response.Profile.FirstName);
              // localStorage.setItem('FailureCount',response.Profile.PasswordLockedCount);
              // localStorage.setItem('LastFailureAttempt',response.Profile.LastFailureAttempt)
              // localStorage.setItem('menuservice',JSON.stringify(response.Services));
            });
          localStorage.setItem('LoginId', response.login_id);
          this._router.navigate(['home']);
        } else {
          this.loginError = true;
        }

      });

  }



}
