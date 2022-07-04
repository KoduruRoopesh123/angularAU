import { Component, OnInit,ViewChild } from '@angular/core';
import { CustRegService } from '../../_services/cust-reg.service';
import { AppComponent } from '../../app.component';
import { jsPDF } from 'jspdf';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import 'jspdf-autotable';
import Swal from 'sweetalert2'


import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  viewData:any=[];
  login_id:any;
  user_login_id :any;
  old_role_id :any;
  old_ServicesList :any;
  
  public viewuserauth = false;
  public edituserauth = false;
  closeResult: any;
  role_id:any;
  ServicesList:any;
  department:any;
  carForm:any;

  public changedformfeald = true;

  reportdata: any =[] ;
  ServicesLists: Array<any> = [];
  roles:any;
  showContent:any;

  modalReference :any;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  title = 'datatables';
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public appComponent:AppComponent,
    private fb: FormBuilder,
    private modalService: NgbModal) {

   }

  ngOnInit(): void {
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      processing: true,
      scrollX: true,
      lengthMenu : [5, 10, 25, 50],
      columnDefs: [
        { orderable: false, targets: 0 }
      ],
      order: [[1, 'asc']]

    };


    const items = [];
    items.push(this.fb.group({
        type: [],
        model: []
    }));

    

    this.carForm = this.fb.group({
        details: this.fb.array( items )
    });
   


    this.login_id = this.appComponent.LoginId;
    //this.showContent=true;

    var getInbox = { action: 'userManagement', tabid: localStorage.getItem('tabid') };
    console.log(getInbox);
     this.regCust.custRegValidation2(getInbox).subscribe(
       (response) => {
         console.log(response);
         if (response.status == "Success") {
           this.reportdata = response.Users;
           this.showContent=true;
         }
       });


  }

  statusChange(value:any){

    if(value == this.old_ServicesList){
      this.changedformfeald = true;
    }else{
      this.changedformfeald =  false;
    }
  
   }
   roleChange(value:any){

    
    if(value == this.old_role_id){
      this.changedformfeald = true;
    }else{
      this.changedformfeald =  false;
    }
   
   }

  addRow() {
    const details = this.carForm.get('details') as FormArray;
    details.push(this.createItem());
}

createItem(): FormGroup {
  return this.fb.group({
      type: [],
      model: []
  });
}

  onSubmit(event: any){

     var updateUser = { action: 'updateUser',login_id:this.user_login_id, user_status:event.target.user_status.value,role_id:event.target.role_id.value , tabid: localStorage.getItem('tabid') };
     console.log(updateUser);

     this.regCust.custRegValidation2(updateUser).subscribe(
       (response) => {
         console.log(response);
          if (response.status == "Success") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
              showConfirmButton: false,
              timer: 4000
            })
           
            this.reportdata = response.Users;
            this.modalReference.close();
           
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
              showConfirmButton: false,
              timer: 4000
            })
  
          }
    
       });
   }

 

   open(content:any,report:any,event:any) { 

    this.viewData = report;
    this.role_id = "";
    if(event.target.classList[1] == "fa-edit"){
     var getInbox = { action: 'updateUserBasics', tabid: localStorage.getItem('tabid') };
    
      this.regCust.custRegValidation2(getInbox).subscribe(
        (response) => {
          console.log(response);
          if (response.status == "Success") {
        
            this.ServicesLists = response.StatusList;
            this.roles = response.Roles;
            this.user_login_id = report.login_id;
            this.role_id = report.role_id;
            this.ServicesList = report.user_status;
            this.old_ServicesList = report.user_status;
          }

        });
        this.edituserauth = true;
     this.viewuserauth = false;

    }
    if(event.target.classList[1] == "fa-eye"){
      this.viewuserauth = true;
      this.edituserauth = false;
    }

       
    this.modalReference = this.modalService.open(content, {size: 'lg',ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result: any) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
    //  alert(reason);
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    

}
