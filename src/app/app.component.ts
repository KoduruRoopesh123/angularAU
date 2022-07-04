import { Component, ViewChild,Pipe, PipeTransform, ElementRef  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

 import { CustRegService } from './_services/cust-reg.service';
 import { BnNgIdleService } from 'bn-ng-idle';
 import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  title = 'AU BANK';
  LastLoginOn:any;
  PasswordLockedOn:any;
  LoginId:any;
  LoginName:any;
  FailureCount:any;
  menuservice:any;
  obj:any;
  Title:any;
  sidebarmargin:any;
  tranServiceId:any;

  public login = false;
  showFiller = false;
  closeResult: any;
  getRoleDetails: any;
  viewProfile:any = {};

 
  admin_services:any;
  reports:any;
  
constructor(
  private _router: Router,
  private http :HttpClient,
  private _eref: ElementRef,
  config: NgbModalConfig, private modalService: NgbModal,
  private route: ActivatedRoute,
  private bnIdle: BnNgIdleService,
  private regCust: CustRegService
  ){ 

    this.bnIdle.startWatching(300).subscribe((res) => {
      if(res) {
        localStorage.clear();

        Swal.fire({
          title: 'Session!',
          text: 'Your Session Had Closed.',
          imageUrl: '/assets/images/logo/au_bank_logo.jpg',
          imageWidth: 380,
          imageHeight: 150,
          imageAlt: 'Custom image',
        })
     

        var accessPage = { action: 'accessPage' };
        this.regCust.custRegValidation2(accessPage).subscribe(
          (response) => {
            if (response.status == "Success") {
              localStorage.setItem('tabid', response.tabid);
            } 
          }); 
      

        this._router.navigate(['login'])
        this.login = false;
        
      }
    })

   if(!!localStorage.getItem('LoginId')){
    this.login=true;
  }

  }


  open(content:any) {
    this.getRoleDetails = { action: 'profile',tabid: localStorage.getItem('tabid')};

    console.log(this.getRoleDetails);
    this.regCust.custRegValidation2(this.getRoleDetails).subscribe(
      (response) => {
        console.log(response);
        this.viewProfile = response.Profile;
      });
 
     this.modalService.open(content, {size: 'lg',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  dropdownClose(event:any,ServiceId:any) {
    this.tranServiceId = ServiceId;
    console.log(this.tranServiceId);
    console.log(this._eref.nativeElement.contains(event.target));
   // or some similar check
    if (!this._eref.nativeElement.contains(event.target)){
      console.log(event);
    } 
    
   }

   
   serviceID(ServiceId:any){
     this.tranServiceId = ServiceId;
   }

  ngOnInit(): void {
   
    // console.log(localStorage.getItem('menuservice'));
         this.LastLoginOn = localStorage.getItem('LastLoginOn');
         this.PasswordLockedOn = localStorage.getItem('PasswordLockedOn');
         this.LoginId = localStorage.getItem('LoginId') 
         this.LoginName = localStorage.getItem('LoginName')
         this.FailureCount = localStorage.getItem('FailureCount')
          this.obj = localStorage.getItem('menuservice');
          this.Title = localStorage.getItem('Title');
          this.menuservice = JSON.parse(this.obj)

          console.log(this.menuservice);

  }



  signout(){
 
      var logout = {action:'logout', tabid:localStorage.getItem('tabid')};
         console.log(logout);
 this.regCust.custRegValidation2(logout).subscribe(
  (response) => {  
   console.log(response);
   localStorage.clear();
   this._router.navigate(['login'])
    this.login = false;
   

  });

  }


}
