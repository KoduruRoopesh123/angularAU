import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustRegService } from '../../_services/cust-reg.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { AmdDependency } from 'typescript';
import { ThrowStmt } from '@angular/compiler';

// import * as $ from 'jquery'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class RoleComponent implements OnInit {

  pointernone:any;

  rightChangeOldValue:Array<any> = [];
  rightChangeNewValue:Array<any> = [];

  moduleChangeOldValue:Array<any> = [];
  moduleChangeNewValue:Array<any> = [];

  active_status:Array<any> = [];
  roles: Array<any> = [];
  role_id: any;
  role_name: any;
  viewRole: any = {};
  viewRoleDetail:Array<any> = [];
  services: Array<any> = [];
  modules:Array<any> = [];
  rights:Array<any> = [];
  details:Array<any> = [];
  maindetails:Array<any> = [];
  updateRowData:Array<any> = [];
  myForm: any;
  role_desc:any;
  disabled = false;
  ShowFilter = true;
  selectedItems: Array<any> = [];
  selectedItem: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  closeResult: any;
  getRoleDetails: any;
  enable: any;
  remarks: any;

  valchek: Array<any>=[];
  public isUpdate = false;
  public isAdd = true;

  showContent: any;

  // data table
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  //data table end

  public isAlert = false;

  constructor(
    private _router: Router,
    public fb: FormBuilder,
    config: NgbModalConfig, private modalService: NgbModal,
    private regCust: CustRegService) {

    // setTimeout(() => this.showContent = true, 800);
    const items = [];
    items.push(this.fb.group({
      module: [this.selectedItem],
      active_status:[this.active_status],
      right:[this.selectedItems],
      
  }));



    this.myForm = fb.group({
      role_id: [""],
      role_name: [""],
      role_desc:[""],
      action: [""],
      tabid: [""],
      enable: [this.enable],
      remarks: [""],
      details: this.fb.array( items )
    });

  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      processing: true,
      scrollX: true,

    };
    var getDepts = { action: 'getRoleBasics', tabid: localStorage.getItem('tabid') };

    this.regCust.custRegValidation2(getDepts).subscribe(
      (response) => {
    
        if (response.status == "Success") {
            this.details = response.details;
            this.maindetails = response.details;
            
            this.details.forEach( (value: { Module_ID: any; Module_Name: any; }) => {
                 this.modules.push({ 'Module_ID': value.Module_ID ,'Module_Name':value.Module_Name }) ;
               }); 
             this.showContent = true;
             this.roles = response.Roles;

        }

      });

  }

 

  moduleChange(value:any, ind:any){


    // console.log( this.details);

    if(value) {
      this.moduleChangeOldValue[ind] = this.moduleChangeNewValue[ind];
      this.moduleChangeNewValue[ind] = value;
  }


    const addedRows = this.myForm.get('details') as FormArray;

    if(addedRows.value.length > 1){
      this.valchek = [];
     for (let i = 0; i < addedRows.value.length ; i++) {
       if(addedRows.value[i].module == value){
         if(addedRows.value[i].right != undefined){
            this.valchek.push( { module_id:addedRows.value[i].module,right: addedRows.value[i].right});
         }
       }
     }
   }



      this.details.forEach((data: { Module_ID: any; Rights: any; }) => {
        
        if(data.Module_ID == value ){
         
           if(this.valchek.length > 0){
            for (let i = 0; i < this.valchek.length ; i++) {
              for (let j = 0; j < data.Rights.length ; j++) {
                  if(data.Rights[j].right == this.valchek[i].right){
                      data.Rights[j].disable = true;
                  }
                }
                  
                if(this.valchek[i].right == "Checker" || this.valchek[i].right == "checker"){
                  for (let j = 0; j < data.Rights.length ; j++) {
                    if(data.Rights[j].right == "Maker" || data.Rights[j].right == "maker"){
                        data.Rights[j].disable = true;
                    }
                  }
                }

                if(this.valchek[i].right == "Maker" || this.valchek[i].right == "maker"){
                  for (let j = 0; j < data.Rights.length ; j++) {
                    if(data.Rights[j].right == "Checker" || data.Rights[j].right == "checker"){
                      data.Rights[j].disable = true;
                    }
                  }
              }
              
            }

          }
      
          this.rights[ind] = data.Rights;
        }
       }); 
    
  }


  rightChange(value:any, ind:any){
  //  const addedRows = this.myForm.get('details') as FormArray;
 console.log("true");
    if(value) {
      this.rightChangeOldValue[ind] = this.rightChangeNewValue[ind];
      this.rightChangeNewValue[ind] = value;
  }


 this.details.forEach((data: { Module_ID: any; Rights: any}) => {

    if(data.Module_ID == this.moduleChangeOldValue[ind]){
       for (let i = 0; i < data.Rights.length ; i++) {

          if(data.Rights[i].right == this.rightChangeOldValue[ind]){
            data.Rights[i].disable = false;
          }
          if(data.Rights[i].right == this.rightChangeNewValue[ind]){
            data.Rights[i].disable = true;
          }


         if(data.Rights[i].right == "Checker" && data.Rights[i].disable == false){
          for (let j = 0; j < data.Rights.length ; j++) {  
            if(data.Rights[j].right == "Maker" || data.Rights[j].right == "maker"){
              data.Rights[j].disable = false;
          }
        }
         }
         if(data.Rights[i].right == "Maker" && data.Rights[i].disable == false){
          for (let j = 0; j < data.Rights.length ; j++) {  
            if(data.Rights[j].right == "Checker" || data.Rights[j].right == "checker"){
              data.Rights[j].disable = false;
          }
        }
         }
    
        }
          if(this.rightChangeNewValue[ind] == "Checker"){
              for (let i = 0; i < data.Rights.length ; i++) {
               if(data.Rights[i].right == "Checker" && data.Rights[i].disable == true){
                for (let j = 0; j < data.Rights.length ; j++) {  
                if(data.Rights[j].right == "Maker" || data.Rights[j].right == "maker"){
                  data.Rights[j].disable = true;
              }
            }
               }
            }
          }

          if(this.rightChangeNewValue[ind] == "Maker"){
            for (let i = 0; i < data.Rights.length ; i++) {

              if(data.Rights[i].right == "Maker" && data.Rights[i].disable == true){
                for (let j = 0; j < data.Rights.length ; j++) {  
              if(data.Rights[j].right == "Checker" || data.Rights[j].right == "checker"){
                  data.Rights[j].disable = true;
              }
            }
              }

          }
          }

    }
    if(data.Module_ID == this.moduleChangeNewValue[ind]){
      for (let i = 0; i < data.Rights.length ; i++) {
        if( data.Rights[i].right == this.rightChangeNewValue[ind]){
         data.Rights[i].disable = true;
       }
       if( data.Rights[i].right == this.rightChangeOldValue[ind]){
        data.Rights[i].disable = false;
      }

      if(data.Rights[i].right == "Checker" && data.Rights[i].disable == false){
        for (let j = 0; j < data.Rights.length ; j++) {  
          if(data.Rights[j].right == "Maker" || data.Rights[j].right == "maker"){
            data.Rights[j].disable = false;
        }
      }
       }
       if(data.Rights[i].right == "Maker" && data.Rights[i].disable == false){
        for (let j = 0; j < data.Rights.length ; j++) {  
          if(data.Rights[j].right == "Checker" || data.Rights[j].right == "checker"){
            data.Rights[j].disable = false;
        }
      }
       }

       if(data.Rights[i].right == "Checker" && data.Rights[i].disable == true){
        for (let j = 0; j < data.Rights.length ; j++) {  
      if(data.Rights[j].right == "Maker" || data.Rights[j].right == "maker"){
          data.Rights[j].disable = true;
      }
    }
  }

    }

      if(this.rightChangeNewValue[ind] == "Maker"){
        for (let i = 0; i < data.Rights.length ; i++) {
          if(data.Rights[i].right == "Maker" && data.Rights[i].disable == true){
            for (let j = 0; j < data.Rights.length ; j++) {  
          if(data.Rights[j].right == "Checker" || data.Rights[j].right == "checker"){
              data.Rights[j].disable = true;
          }
        }
      }
    }
    }


   
    }

  })


}

addRow(){
    const details = this.myForm.get('details') as FormArray;
    details.push(this.createItem());
}

deleteRow(index:any){

  const details = this.myForm.get('details') as FormArray;
  // console.log(details);
  if(details.value.length > 1){
    if(this.role_id){
    this.updateRowData.splice(index,1)
      for( let i=0; i <this.updateRowData.length; i++){
        // this.addRow();
       this.rights[i] = this.updateRowData[i].Rights;
       this.selectedItem[i] = this.updateRowData[i].module_id ;
       this.active_status[i] = this.updateRowData[i].active_status;
       this.selectedItems[i] = this.updateRowData[i].right;
    }
    }
      details.removeAt(index);
  }
  
}

createItem(): FormGroup {
  return this.fb.group({
    module: [this.selectedItem],
    active_status:[this.active_status],
    right:[this.selectedItems],
    
  });
}



create(){
  this.reset();
  this.isUpdate = false;
  this.isAdd = true;
}






  open(content: any, role: any) {

    this.getRoleDetails = { action: 'viewRole', role_id: role.role_id, tabid: localStorage.getItem('tabid') };

    this.regCust.custRegValidation2(this.getRoleDetails).subscribe(
      (response) => {
 
        if (response.status == "Success") {
          this.viewRole = response.Role;
          this.viewRoleDetail = response.details;
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

  update(role: any) {


    this.pointernone="pointer-events: none;";

    this.reset();
   
    this.getRoleDetails = { action: 'viewRole', role_id: role.role_id, tabid: localStorage.getItem('tabid') };
   
    this.regCust.custRegValidation2(this.getRoleDetails).subscribe(
      (response) => {
  
        this.role_name = response.Role.role_name;
        this.role_id = response.Role.role_id;
        this.enable = response.Role.enable;
        this.role_desc = response.Role.description;
        this.details = response.AllRights;
        this.updateRowData = response.details;

          for( let i=0; i <this.updateRowData.length; i++){
            this.addRow();
           this.rights[i] = this.updateRowData[i].Rights;
           this.selectedItem[i] = this.updateRowData[i].module_id ;
           this.active_status[i] = this.updateRowData[i].active_status;
           this.selectedItems[i] = this.updateRowData[i].right;
        } 
        const rowDetails = this.myForm.get('details') as FormArray;
        rowDetails.removeAt(this.updateRowData.length);
        
        this.isUpdate = true;
        this.isAdd = false;
      });
     
  }

  validation(event: any) {
    if (this.regCust.allowNameSpace(event.key)) {
      this.role_name = this.role_name;
    } else {
      var str = this.role_name;
      this.role_name = str.slice(0, -1);
      this.isAlert = true;
      setTimeout(() => { this.isAlert = false; }, 3000);
    }
  }

  reset() {
    this.role_name = "";
    this.role_id = "";
    this.role_desc = "";

    this.rights = [];
    this.selectedItem = [];
    this.active_status = [];
    this.selectedItems = [];

      this.valchek = [];
  this.rightChangeOldValue = [];
  this.rightChangeNewValue = [];
  this.moduleChangeOldValue = [];
  this.moduleChangeNewValue = [];
  
  this.details = [];
  this.details = this.maindetails;

    const details = this.myForm.get('details') as FormArray;
    var count = details.value.length;
    for (let i = 1; i < count ; i++) {
      details.removeAt(0);
    }

     

  }

  submitRole() {

    if (this.myForm.value.role_id != undefined && this.myForm.value.role_id != "") {
      this.myForm.controls['action'].setValue('updateRole');
      if(this.myForm.value.enable == true){
        this.enable = 'T';
      }else{
        this.enable = 'F';
      }
    } else {
      this.myForm.controls['action'].setValue('addRole');
    }
    this.showContent = false;
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
  
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
          this.remarks = "";
          this.roles = response.Roles;
          this.showContent = true;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
          this.remarks = "";
          this.showContent = true;
        }
      });

      this.reset();
 
      

  }

}
