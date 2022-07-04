import { Component, OnInit } from '@angular/core';
import { CustRegService } from '../../../_services/cust-reg.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pre-insta-loan-transaction-report',
  templateUrl: './pre-insta-loan-transaction-report.component.html',
  styleUrls: ['./pre-insta-loan-transaction-report.component.css']
})
export class PreInstaLoanTransactionReportComponent implements OnInit {

  
  viewData:any=[];
  myForm: FormGroup;

  closeResult: any;
  title = 'Transactional Report';

  actions: Array<any> = [];
  dtOptions: any = {};

  reportdata: any =[] ;
  showContent:any;
  datefilter:any;
  req_id:any;
  selectedItem: any;

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public fb: FormBuilder,
    private modalService: NgbModal) { 

      this.myForm = fb.group({
        datefilter: [""],
        req_id:[""],
        action_name:[""],
        action:[""],
        tabid:[""]
      });

    }

    basicDataGet(){
      var preInstaLoanTransactionReport = { action: 'preInstaLoanTransactionReport', tabid:localStorage.getItem('tabid')};

      this.regCust.custRegValidation2(preInstaLoanTransactionReport).subscribe(
        (response) => {
  
          console.log(response);
          if (response.status == "Success") {
               //console.log(response.Transactions); 
            this.reportdata = response.Transactions;
            this.actions = response.TransActionData;
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
          { extend: 'excel',text:'Excel',title:'preInstaLoanTransactionReport',exportOptions:{columns:[0,1,2,3,4]}, className: 'btn btn-info' },
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
        this.myForm.controls['action'].setValue('preInstaLoanTransactionReport');
        this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
        if(this.selectedItem == "null"){
          this.myForm.controls['action_name'].setValue('');
        }
        console.log(this.myForm.value);
        this.regCust.custRegValidation2(this.myForm.value).subscribe(
        (response) => {
          this.showContent=true;
          console.log(response);
          this.reportdata = response.Transactions;
          this.datefilter = "";
          this.req_id = "";
          this.selectedItem ="null";
        })
      } 

      reset(){
        this.showContent=false;
          this.datefilter = "";
          this.req_id = "";
          this.selectedItem ="null";
          this.basicDataGet();
      }

}
