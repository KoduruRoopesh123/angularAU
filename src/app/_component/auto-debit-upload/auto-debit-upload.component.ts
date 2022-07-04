import { Component, OnInit, Input } from '@angular/core';
import { CustRegService } from '../../_services/cust-reg.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auto-debit-upload',
  templateUrl: './auto-debit-upload.component.html',
  styleUrls: ['./auto-debit-upload.component.css']
})
export class AutoDebitUploadComponent implements OnInit {


  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file
  file_name:any;
  file_type:any;
  myForm: FormGroup;
  // channel: Array<any> = [];
  approver: Array<any> = [];
  // channelSelected: Array<any> = [];
  approverSelected: any;
  filedetals: Array<any> = [];
  remarks: any;
  public radioModel = '';
  private base64textString: any = "";
  public isAlert = false;
  showContent: any;
  viewemionpos:any;
  closeResult: any;
  base64:any;

  // data table
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtInstance: any = {};
  //data table end

  constructor(private regCust: CustRegService,private appcomponent:AppComponent, public fb: FormBuilder, config: NgbModalConfig, private modalService: NgbModal,) {

    this.myForm = fb.group({
      file: [""],
       priority: [""],
      //  channel: [this.channelSelected],
       approver: [this.approverSelected],
       action: [""],
       serviceId:[""],
       tabid: [""],
       file_type:[""],
       file_name:[""],
       remarks: [""],
       base64textString: [""]
     });

   }


        /* On File Select*/
  onChange(event: any) {
    var files = event.target.files;
    this.file = files[0];
    this.file_name = this.file.name;
    this.file_type = this.file.type;
    console.log(this.file);
    /* Validating xlsx and xls*/
    // if (this.file.name.split('.').pop() == "xlsx" || this.file.name.split('.').pop() == "xls") {
     
    //   if (files && this.file) {
    //     var reader = new FileReader();
    //     reader.onload = this._handleReaderLoaded.bind(this);
    //     reader.readAsBinaryString(this.file);
    //   }
     

    // } else {
    //   this.file = "";
    //   this.isAlert = true;
    //   setTimeout(() => { this.isAlert = false; }, 3000);
    // }

    /* Validating text file */

    if (this.file.name.split('.').pop() == "txt") {
     
      if (files && this.file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.file);
      }
     

    } else {
      this.file = "";
      this.isAlert = true;
      setTimeout(() => { this.isAlert = false; }, 3000);
    }

    /* Validating text file end of the file */
   

  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
  }

  reset() {
    this.file = "";
    // this.channel = [];
    this.approverSelected = "null";
    this.approver = [];
    this.remarks = "";
    this.base64textString = "";
  }

  open(content: any, filedetal: any) {

    console.log(filedetal);

     this.viewemionpos = filedetal;

    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      processing: true,
      scrollX: true,
    };
    this.approverSelected = "null";

    //alert("sdgsr");
    this.radioModel="Low";
    var getDwhBasics = { action: 'getAutoDebitBasics', tabid: localStorage.getItem('tabid') };
    //console.log(this.myForm.value)
    this.regCust.custRegValidation2(getDwhBasics).subscribe(
      (response) => {
        // console.log(response.status);
        if (response.status == "Success") {
          // this.channel = response.Channels;
          this.approver = response.Makers;
          this.filedetals = response.Requests;
          this.showContent = true
      
        }
      });

  }

    /* Submitting form*/
    submitDebit() {
      console.log(this.myForm.value);
      this.loading = !this.loading;
      // console.log(this.file);
     // var uploadEmiFile = { action: 'uploadEmiFile', tabid: localStorage.getItem('tabid') };
      //this.myForm.controls['file'].setValue(this.file);
        this.myForm.controls['action'].setValue('uploadAutoDebitFile');
        this.myForm.controls['file_name'].setValue(this.file_name);
        this.myForm.controls['file_type'].setValue(this.file_type);
        this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
        this.myForm.controls['serviceId'].setValue(this.appcomponent.tranServiceId);
      this.myForm.controls['base64textString'].setValue(this.base64textString);
      if(this.approverSelected == "null"){
        this.myForm.controls['approver'].setValue('');
      }
      console.log(this.myForm.value)
      this.regCust.custRegValidation2(this.myForm.value).subscribe(
        (response) => {
          console.log(response);
          if (response.status == "Success") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '<div style="font-size:16px">' + response.errorDesc + '</div>',
              showConfirmButton: false,
              timer: 10000
            })
            this.file = "";
            // this.channel = [];
            this.approverSelected = "null";
            this.approver = [];
            this.remarks = "";
            this.base64textString = "";
  
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<div style="font-size:16px">' + response.errorDesc + '</div>',
              showConfirmButton: false,
              timer: 10000
            })
  
          }
        });
  
    }

}
