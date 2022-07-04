import { Component, Input, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { CustRegService } from '../../_services/cust-reg.service';
import { CommonServicesService } from '../../_services/common-services.service';
import { AppComponent } from '../../app.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2'


// declare var $: any;

import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { forEach } from 'angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {



  viewData:any=[];
   
  public approvedstatus = false;
  public rejectedstatus = false;
  public viewstatus = false;

 
  closeResult: any;
  // dtOptions: any = {};
  // dtOptions1: any = {};
  login_id:any;
  requestId:any;
  requestStatus:any;
  base64:any;
  serviceId:any;

  reportdata: any =[] ;
  showContent:any;

  obj:any;
  viewAlert: any = {};
  rules : Array<any> = [];
  sms_mapping: Array<any> = [];

    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;
    title = 'datatables';
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
  
    //data table end

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public CommonServices:CommonServicesService,
    public appComponent:AppComponent,
    private modalService: NgbModal) {

   }

  ngOnInit(): void {

    // var table = $('#example').DataTable({
    //   "scrollX": true,
    //   "pageLength": 5
    // });

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

    this.login_id = this.appComponent.LoginId;
    
    this.serviceId = "17";
   

  //  this.obj = localStorage.getItem('menuservice');

  //  var arrayobj = JSON.parse(this.obj);
  //  for(var i =0; i<=arrayobj.length ;i++){
  //     if(arrayobj[i].ServiceId == '1'){
  //       console.log(arrayobj[i].ServiceName);
  //     }
  //  }

var getInbox = { action: 'inbox', tabid: localStorage.getItem('tabid') };
 
    this.regCust.custRegValidation2(getInbox).subscribe(
      (response) => {
        // console.log(response);
        if (response.status == "Success") {
          this.reportdata = response.Inbox;
          this.showContent=true;
        }
      });
  }


  onSubmit(event: any){
 
    var authRequest = { action: 'authRequest', status:this.requestStatus, remarks:event.target.remarks.value, req_token_id: this.requestId, tabid: localStorage.getItem('tabid') };
    this.showContent=false;
    this.regCust.custRegValidation2(authRequest).subscribe(
      (response) => {

        if (response.status == "Success") {
 
          if(response.Inbox.length > 0){
            this.reportdata = [];
            this.reportdata = response.Inbox;
            this.showContent=true;
          }else{
            this.reportdata = [];
          }

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
          // console.log(response.Inbox.length);
          
        }
      });
  }

  downloadExcel(fileName:any){
   
    var downloadExcel = { action: 'downloadAlertFile',file_name:fileName, tabid: localStorage.getItem('tabid') };
    this.regCust.custRegValidation2(downloadExcel).subscribe(
      (response) => {
        if (response.status == "Success") {
             this.base64 = response.decode_excel;
             var excel = this.base64;
             const downloadLink  = document.createElement('a');
             const linkSource ="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"+excel;
             downloadLink.href = linkSource;
             downloadLink.download = response.file_name;
             downloadLink.click(); 
        }
      });
  }

  open(content:any,report:any,event:any){

    if(event.target.classList[1] == "fa-check"){
      this.approvedstatus = true;
      this.rejectedstatus = false;
      this.viewstatus = false;
      this.requestId = report.req_token_id;
      this.requestStatus="Approved";
      this.modelOpen(content);
    }
    if(event.target.classList[1] == "fa-close"){
      this.rejectedstatus = true;
      this.approvedstatus = false;
      this.viewstatus = false;
      this.requestId = report.req_token_id;
      this.requestStatus="Rejected";
      this.modelOpen(content);
    }
    if(event.target.classList[1] == "fa-eye"){
      this.viewData = report;
      this.viewstatus = true;
      this.rejectedstatus = false;
      this.approvedstatus = false;
      this.modelOpen(content);
    }

   }

   alertOpen(content1:any,report:any,event:any){
    
    if(event.target.classList[1] == "fa-eye"){
      // if(report.service_id == this.serviceId || report.service_id == "18"){
        console.log(report);
        this.CommonServices.alertView(content1,report);
        setTimeout(() => {
          this.viewAlert  = this.CommonServices.viewAlert;
          this.rules = this.CommonServices.rules;
          this.sms_mapping = this.CommonServices.sms_mapping;
        }, 200);
      // }

    }
   }

   private modelOpen(content:any){
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





}
