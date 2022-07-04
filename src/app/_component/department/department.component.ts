import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustRegService } from '../../_services/cust-reg.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { AmdDependency } from 'typescript';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  module_desc: any;
  module_name: any;
  viewDept: any = {};
  depts: Array<any> = [];
  module_id:any;
  selectedItems: Array<any> = [];
  rights: Array<any> = [];
  download:Array<any> = [];
  active_status:Array<any> = [];
  // rights:any;
  services: Array<any> = [];
  details:Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  ShowFilter = true;
  remarks:any;
  //myForm1: any;
  myForm: any;
  getServiceDetails: any;
  closeResult: any;
  showContent: any;
  updateDept: any;
  enable: any;

  name: any;
  public isUpdate = false;
  public isAdd = true;
  // data table
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtInstance: any = {};
  updateCall: any;
  //data table end

  constructor(private _router: Router,
    public fb: FormBuilder,
    config: NgbModalConfig, private modalService: NgbModal,
    private regCust: CustRegService) {


    const items = [];
    items.push(this.fb.group({
      rights: [this.rights],
      service: [this.selectedItems],
      download:[this.download],
      active_status:[this.active_status]
  }));

  // console.log(items);

  this.myForm = this.fb.group({
    module_name: [null],
    module_desc: [null],
    module_id:[this.module_id],
    action: [""],
    updateDept: [""],
    tabid: [""],
    remarks:[""],
    enable: [this.enable],
    details: this.fb.array( items )
});

}


  ngOnInit(): void {    
    this.updateCall = 0;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      processing: true,
      scrollX: true,
    };


    var getServices = { action: 'getModuleList', tabid: localStorage.getItem('tabid') };
    this.regCust.custRegValidation2(getServices).subscribe(
      (response) => {
        console.log(response);
        if (response.status == "Success") {
          this.depts = response.Modules;
          this.services = response.Services;
          // this.modules = response.Modules

          this.dropdownSettings = {
            singleSelection: false,
            idField: 'service_id',
            textField: 'display_name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: this.ShowFilter
          };
  
          this.showContent = true
        }
      });
  }

addRow() {
    const details = this.myForm.get('details') as FormArray;
    details.push(this.createItem());
    // console.log(details);
}

deleteRow(index:any){

  const details = this.myForm.get('details') as FormArray;
  if(details.value.length > 1){
  if(this.module_id){
    //  details.clear();
    this.details.splice(index,1)
    for( let i=0; i <this.details.length; i++){
      // this.addRow();
     this.rights[i] = this.details[i].rights;
     this.download[i] = this.details[i].download ;
     this.active_status[i] = this.details[i].active_status;
     this.selectedItems[i] = this.details[i].services;
    }
  }
      details.removeAt(index);
 
  }

}

createItem(): FormGroup {
  return this.fb.group({
      rights: [this.rights],
      service: [this.selectedItems],
      download:[this.download],
      active_status:[this.active_status]
  });
}


  update(service: any) {
    this.reset();
    var getModuleView = { action: 'viewModule', tabid: localStorage.getItem('tabid'),module_id:service.module_id };
    console.log(getModuleView);
    this.regCust.custRegValidation2(getModuleView).subscribe(
      (response) => {
        if (response.status == "Success") {
          // console.log(response);
          this.updateDept = "update";
          this.module_desc = response.description;
          this.module_name = response.module_name;
          this.module_id = service.module_id;
          this.enable = response.enable;   
          this.details = response.details;
          this.remarks = response.remrks;     
            for( let i=0; i <this.details.length; i++){
              this.addRow();
             this.rights[i] = this.details[i].rights;
          
             this.download[i] = this.details[i].download ;
             this.active_status[i] = this.details[i].active_status;
             this.selectedItems[i] = this.details[i].services;
            
          }
          console.log(this.details);
          const rowDetails = this.myForm.get('details') as FormArray;
          rowDetails.removeAt(this.details.length);
        
          this.isUpdate = true;
          this.isAdd = false;
        }
      });

    this.updateDept = "update";
    this.module_desc = service.description;
    this.module_name = service.department;

    // const details = this.myForm.get('details') as FormArray;
    // console.log(details);
   
  }

  //model view content
  open(content: any, dept: any) {

    var getModuleView = { action: 'viewModule', tabid: localStorage.getItem('tabid'),module_id:dept.module_id };
    console.log(getModuleView);
    this.regCust.custRegValidation2(getModuleView).subscribe(
      (response) => {
        console.log(response);
        if (response.status == "Success") {
          this.viewDept = response;
        }
      });

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

  reset() {
    this.module_desc = "";
    this.module_name = "";
    this.rights =[""] ;
    this.download=[""] ;
    this.active_status=[""];
    this.selectedItems=[""];


    const details = this.myForm.get('details') as FormArray;
    var count = details.value.length;
    for (let i = 1; i < count ; i++) {
      details.removeAt(0);
    } 
 
    
  }

  create(){
    this.reset();
    this.isUpdate = false;
    this.isAdd = true;
  }

  submitDept() {
    if (this.myForm.value.updateDept == "update") {
      this.myForm.controls['action'].setValue('updateModule');
        if(this.myForm.value.enable == true){
          this.enable = 'T';
        }else{
          this.enable = 'F';
        }
    } else {
      this.myForm.controls['action'].setValue('addModule');
    }

    this.showContent = false;
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
    // console.log(this.myForm.value);
    
    this.regCust.custRegValidation2(this.myForm.value).subscribe(
      (response) => {
        if (response.status == "Success") {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
          this.showContent = true;
          console.log(response);
          this.remarks = "";
          this.depts = response.Modules;
    
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
          this.showContent = true;
          this.remarks = "";
         
        }
      });

  this.reset();

  }


}
