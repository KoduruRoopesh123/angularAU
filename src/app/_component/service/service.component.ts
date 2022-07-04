import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustRegService } from '../../_services/cust-reg.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  action_url: any;
  service_id: any;
  service_name: any;
  node_type: any;
  display_name: any;
  icon_value: any;
  viewService: any = {};
  services: Array<any> = [];
  ServicesLists: any;
  myForm: FormGroup;
  selectedItem: any = {};
  getServiceDetails: any;
  showContent: any;
  closeResult: any;
  description: any;
  fafa: Array<any> = [];
  remarks: any;
  enable: any;

  public parenthide = true;
  public isUpdate = false;
  public isAdd = true;


  // data table
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  //data table end


  constructor(private _router: Router,
    public fb: FormBuilder,
    config: NgbModalConfig, private modalService: NgbModal,
    private regCust: CustRegService
  ) {

   
    this.myForm = fb.group({
      service_id: [""],
      service_name: [""],
      parent_service: [null],
      node_type: [""],
      display_name: [""],
      action: [""],
      icon: [""],
      action_url: [""],
      tabid: [''],
      description: [""],
      remarks: [""],
      enable: [""]
    });

  }

  parantService(inputval: any) {
    if (inputval.target.value == "Parent") {
      this.parenthide = false;
    } else {
      this.parenthide = true;
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
    this.icon_value = "null";
    this.node_type = "null";
    this.selectedItem = "null";

    var getServices = { action: 'getServices', tabid: localStorage.getItem('tabid') };
    this.regCust.custRegValidation2(getServices).subscribe(
      (response) => {
   
        if (response.status == "Success") {
          this.ServicesLists = response.ParentList;
          this.services = response.Services;
          this.fafa = response.IconsList;
          this.showContent = true
          this.dtTrigger.next();
        }

      });
  }



  update(service: any) {
    this.action_url = service.action_url;
    
    if (service.parent_service == null) {
      this.parenthide = false;
    } else {
      this.parenthide = true;
    }

    this.service_name = service.service_name;
    this.display_name = service.display_name
    this.service_id = service.service_id;
    this.description = service.description;
    this.selectedItem = service.parent_service;
    this.icon_value = service.icon;
    this.enable = service.enable;
    this.remarks = service.remarks;
    this.node_type = service.node_type;
    this.isUpdate = true;
    this.isAdd = false;
  }


  open(content: any, service: any) {
    this.viewService = service;
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
    this.action_url = "";
    this.service_name = "";
    this.service_id = "";
    this.display_name = "";
    this.enable = "";
    this.icon_value = "null";
    this.node_type = "null";
    this.selectedItem = "null";
    this.description = "";
    this.remarks = "";
  }

  submitService() {
    if (this.myForm.value.service_id != "" && this.myForm.value.service_id != undefined) {
      this.myForm.controls['action'].setValue('updateService');
    } else {
      this.myForm.controls['action'].setValue('createService');
    }
    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
    if (Object.keys(this.myForm.value.parent_service).length === 0) {
      this.myForm.controls['parent_service'].setValue('');
    }
    if (this.myForm.value.action_url == undefined && this.myForm.value.action_url == "") {
      this.myForm.controls['action_url'].setValue('');
    }

    if(this.icon_value == "null"){
      this.myForm.controls['icon'].setValue('');
    }

    if(this.node_type == "null"){
      this.myForm.controls['node_type'].setValue('');
    }

    if(this.selectedItem == "null"){
      this.myForm.controls['parent_service'].setValue('');
    }


    this.showContent = false;
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

          this.services = response.Services;
          this.showContent = true;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
        }
        this.showContent = true;
      });

    this.action_url = "";
    this.service_name = "";
    this.service_id = "";
    this.display_name = "";
    this.enable = "";
    this.icon_value = "null";
    this.node_type = "null";
    this.selectedItem = "null";
    this.description = "";
    this.remarks = "";

  }

}
