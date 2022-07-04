import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CustRegService } from '../../_services/cust-reg.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  // LastLogin:any;
  // LoginId:any;
  // LoginName:any;
  // FailureCount:any;
  // menuservice:any;
  Welcome_Quote:any;



  constructor(private appcomponent:AppComponent, 
    private _router: Router,
    private regCust: CustRegService) {
      this.appcomponent.login = true;
    //  alert(_router.url);
     }
     

  ngOnInit(): void {
   
    var homerequest = {action:'home', tabid:localStorage.getItem('tabid')};

        this.regCust.custRegValidation2(homerequest).subscribe(
      (response) => {
        if(response.status == "Success"){
        this.Welcome_Quote = response.Welcome_Quote
        this.appcomponent.LastLoginOn = response.Profile.LastLoginOn;
        this.appcomponent.PasswordLockedOn = response.Profile.PasswordLockedOn;
        this.appcomponent.LoginId = response.Profile.LoginID;
        this.appcomponent.LoginName = response.Profile.FirstName;
        this.appcomponent.FailureCount = response.Profile.PasswordLockedCount;
        this.appcomponent.obj = response.Services;
        this.appcomponent.menuservice = this.appcomponent.obj;
        this.appcomponent.Title = response.Profile.Title;
        // alert(response.Profile.Title);

         localStorage.setItem('LastLoginOn',response.Profile.LastLoginOn);
         localStorage.setItem('PasswordLockedOn',response.Profile.PasswordLockedOn);
         localStorage.setItem('LoginName',response.Profile.FirstName);
         localStorage.setItem('FailureCount',response.Profile.PasswordLockedCount);
         localStorage.setItem('LastFailureAttempt',response.Profile.LastFailureAttempt);
         localStorage.setItem('Title',response.Profile.Title)
         localStorage.setItem('menuservice',JSON.stringify(response.Services));
     
        }
      });




  }


  

}
function a(a: any, arg1: (any: any) => any) {
  throw new Error('Function not implemented.');
}

