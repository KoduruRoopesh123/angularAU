import { Component, OnInit } from '@angular/core';
import { CustRegService } from '../../../_services/cust-reg.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pre-insta-loan-request-report',
  templateUrl: './pre-insta-loan-request-report.component.html',
  styleUrls: ['./pre-insta-loan-request-report.component.css']
})

export class PreInstaLoanRequestReportComponent implements OnInit {

  viewData:any=[];
  myForm: FormGroup;

  closeResult: any;
  title = 'Transactional Report';
  selectedItem: any;
  channels: Array<any> = [];
  dtOptions: any = {};

  reportdata: any =[] ;
  showContent:any;
  datefilter:any;
  req_id:any;

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public fb: FormBuilder,
    private modalService: NgbModal) {
      this.myForm = fb.group({
        datefilter: [""],
        req_id:[""],
        channel_name:[this.selectedItem],
        action:[""],
        tabid:[""]
      });
     }

    
     basicDataGet(){
      var preInstaLoanRequestReport = { action: 'preInstaLoanRequestReport', tabid:localStorage.getItem('tabid')};

      this.regCust.custRegValidation2(preInstaLoanRequestReport).subscribe(
        (response) => {
  
          if (response.status == "Success") {
            this.reportdata = response.Transactions;
            console.log(this.reportdata);
            this.channels = response.TransActionData;
            this.showContent=true
          }
  
        });
     }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      responsive: true,
      processing: true,
      scrollX: true,
      dom: 'Bfrtip',
        buttons: [
          // { extend: 'copy', className: 'btn btn-success' },
          // { extend: 'csv', className: 'btn btn-success' },
          { extend: 'excel',text:'Excel',title:'preInstaLoanRequestReport',exportOptions:{columns:[0,1,2,3,4,5,6]}, className: 'btn btn-info' },
          //   { 
          //   text: 'PDF', className: 'btn btn-success',
          //      action: () =>{
          //        this.createPdf();
          //      }
          //  }    
        ]
    };
    this.selectedItem = "null";

    this.basicDataGet();
  }


    
  createPdf() {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transactional Report', 11, 8);
    (doc as any).autoTable(  {
      body: this.reportdata,
      theme: 'plain',
      margin: { top: 20, left: 10, right: 10, bottom: 0 },
        
    })
    doc.output('dataurlnewwindow')

  }

  open(content:any,report:any) {

    // console.log(report);
     this.viewData = report;
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


   reportFilter(){
    this.showContent=false;
    this.myForm.controls['action'].setValue('preInstaLoanRequestReport');
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
    if(this.selectedItem == "null"){
      this.myForm.controls['channel_name'].setValue('');
    }
    console.log(this.myForm.value);
    this.regCust.custRegValidation2(this.myForm.value).subscribe(
    (response) => {
      this.showContent=true;
      console.log(response);
      this.reportdata = response.Transactions;
      this.datefilter="";
      this.req_id="";
      this.selectedItem="null";
    })
  } 

  reset(){
    this.showContent=false;
    this.datefilter="";
    this.req_id="";
    this.selectedItem="null";
    this.basicDataGet();
  }

}
