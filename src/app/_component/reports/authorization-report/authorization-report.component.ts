import { Component, OnInit } from '@angular/core';
import { CustRegService } from '../../../_services/cust-reg.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authorization-report',
  templateUrl: './authorization-report.component.html',
  styleUrls: ['./authorization-report.component.css']
})
export class AuthorizationReportComponent implements OnInit {

  viewData:any=[];
  myForm: FormGroup;

  closeResult: any;
  dtOptions: any = {};
  reportdata: any =[] ;
  showContent:any;

  token_id:any;
  maker:any;
  datefilter:any;

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public fb: FormBuilder,
    private modalService: NgbModal) { 

      this.myForm = fb.group({
        datefilter: [""],
        maker:[""],
        token_id:[""],
        action:[""],
        tabid:[""]
      });

  }

  basicDataGet(){
    var checkerActivities = { action: 'checkerActivities', tabid:localStorage.getItem('tabid') };
   console.log(checkerActivities);
    this.regCust.custRegValidation2(checkerActivities).subscribe(
      (response) => {
        this.showContent=true;
        console.log(response);
        if (response.status == "Success") {
             console.log(response.Requests); 
          this.reportdata = response.Requests;
          
        }
      });
  }


  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      scrollX: true,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
          // { extend: 'copy', className: 'btn btn-success' },
          // { extend: 'csv', className: 'btn btn-success' },
          { extend: 'excel',text:'Excel',title:'AuthorizationReport',exportOptions:{columns:[0,1,2,3,4,5,6,7,8,9,10]}, className: 'btn btn-info' },
          //   { 
          //   text: 'PDF', className: 'btn btn-success',
          //      action: () =>{
          //        this.createPdf();
          //      }
          //  }    
        ]
    };

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
    this.myForm.controls['action'].setValue('checkerActivities');
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
    console.log(this.myForm.value);
    this.regCust.custRegValidation2(this.myForm.value).subscribe(
    (response) => {
      this.showContent=true;
      console.log(response);
      this.reportdata = response.Requests;
    })
  } 
  
  reset() {

    this.showContent=false;
    this.token_id = "";
    this.maker = "";
    this.datefilter = "";

    this.basicDataGet();

  }


}
