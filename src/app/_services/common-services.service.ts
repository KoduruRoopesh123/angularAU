import { Injectable } from '@angular/core';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isConstructorDeclaration } from 'typescript';
import { CustRegService } from '../_services/cust-reg.service';

@Injectable({
  providedIn: 'root'
})


export class CommonServicesService {
  viewAlert: any = {};
  rules : Array<any> = [];
  sms_mapping: Array<any> = [];
  closeResult: any;

  constructor(private regCust: CustRegService,private modalService: NgbModal) { }

  alertView(content: any, alert: any){
    var getAlertDetails = { action: 'viewAlert', alert_id: alert.alert_id, tabid: localStorage.getItem('tabid') };
    this.regCust.custRegValidation2(getAlertDetails).subscribe(
      (response) => {
        if (response.status == "Success") {
          console.log(response);
          this.viewAlert  = response.Alert;
          this.rules = response.details;
          this.sms_mapping = response.sms_mapping;
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

}
