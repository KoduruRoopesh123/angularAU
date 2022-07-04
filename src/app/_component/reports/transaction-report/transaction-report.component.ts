import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { CustRegService } from '../../../_services/cust-reg.service';
import { jsPDF } from 'jspdf';
import { Subject } from 'rxjs';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

//view variable initilizers
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
min: any;
max: any;


viewData:any=[];
myForm: FormGroup;

//end of view variable initializers

  closeResult: any;
  title = 'Transactional Report';
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
   
     
    head:any = [];
    //head:any = [['Action Status','Action Tried','Action URL','Err Code','Err Desc','Last Login Date','Login Id','Login Status','Request Date','Request From','Session ID']];
    reportdata: any =[] ;
    showContent:any;
    //data table end

    login_id:any;
    action_tride:any;
    datefilter:any;

  constructor(private regCust: CustRegService, 
    config: NgbModalConfig, 
    public fb: FormBuilder,
    private modalService: NgbModal,) { 

      this.myForm = fb.group({
        datefilter: [""],
        login_id:[""],
        action_tride:[""],
        action:[""],
        tabid:[""]
      });

  }


  // ngOnDestroy(): void {
  //   $.fn['dataTable'].ext.search.pop();
  // }
basicDataGet(){
  var transReport = { action: 'transReport', tabid:localStorage.getItem('tabid') };
    
  this.regCust.custRegValidation2(transReport).subscribe(
    (response) => {
      if (response.status == "Success") {
        console.log(response);
        this.reportdata = response.Transactions;
       // console.log(this.reportdata);
       // this.head = ['Audit Id', 'Login Id', 'Request From', 'Accessed Time', 'Action Tried', 'Action Status', 'Action'];
        this.showContent=true
        this.dtTrigger.next();
        // this.loadOrganisations(),
      }
    });
}

  ngOnInit(): void {


    // $.fn['dataTable'].ext.search.push((settings:any, data:any, dataIndex:any) => {
    //   const id = parseFloat(data[0]) || 0; // use data for the id column
    //   if ((isNaN(this.min) && isNaN(this.max)) ||
    //     (isNaN(this.min) && id <= this.max) ||
    //     (this.min <= id && isNaN(this.max)) ||
    //     (this.min <= id && id <= this.max)) {
    //     return true;
    //   }
    //   return false;
    // });
 

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      responsive: true,
      processing: true,
      dom: 'Bfrtip',
      scrollX: true,
       buttons: [
            // { extend: 'copy', className: 'btn btn-success' },
            // { extend: 'csv', className: 'btn btn-success' },
            { extend: 'excel', title:'UserAccessReport',exportOptions:{columns:[0,1,2,3,4,5,6]},className: 'btn btn-info' },
            // { text: 'PDF', className: 'btn btn-success',
            //      action: () =>{
            //        this.createPdf();
            //      }
            //  }  
           
          ]
    };

this.basicDataGet();
  }

  // filterById() {
  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.draw();
  //   });
 

  // }

  createPdf() {

    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transactional Report', 11, 8);
    // doc.setFontSize(10);
    // doc.setTextColor(100);

    (doc as any).autoTable(  {
      head: this.head,
      body: this.reportdata,
      theme: 'plain',
      margin: { top: 20, left: 10, right: 10, bottom: 0 },
                // drawHeaderCell: function (cell:any, data:any) {
                //     if (cell.raw === 'Audit Id') {//paint.Name header red
                //         cell.styles.fontSize= 15;
                //        cell.styles.textColor = [255,0,0];
                //     } else {
                //         cell.styles.textColor = 255;
                //         cell.styles.fontSize = 10;

                //     }
                // },
                //    createdCell: function (cell:any, data:any) {
                //     if (cell.raw === 'Jack') {
                //        cell.styles.fontSize= 15;
                //        cell.styles.textColor = [255,0,0];
                //     } 
                // }


      // didDrawCell: (data: { column: { index: any; }; }) => {
      //   console.log(data.column.index)
      // }
    })

   // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

   // below line for Download PDF document  
   //doc.save('myteamdetail.pdf');

  }


  //model view content


  open(content:any,report:any) {

    console.log(report);
    this.viewData = report;
    console.log(this.viewData);

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
    this.myForm.controls['action'].setValue('transReport');
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
console.log(this.myForm.value);
    this.regCust.custRegValidation2(this.myForm.value).subscribe(
    (response) => {
      this.showContent=true;
      console.log(response);
      this.reportdata = response.Transactions;
    })
  } 

  reset(){
    this.showContent=false;
    this.login_id = "";
    this.action_tride = "";
    this.datefilter = "";
    this.basicDataGet();
  }
  



}
