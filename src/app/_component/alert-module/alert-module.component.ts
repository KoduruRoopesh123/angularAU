import { Component, OnInit, ViewChild,Input, ChangeDetectionStrategy, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustRegService } from '../../_services/cust-reg.service';
import { AppComponent } from '../../app.component';
import { CommonServicesService } from '../../_services/common-services.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-module',
  templateUrl: './alert-module.component.html',
  styleUrls: ['./alert-module.component.css']
})
export class AlertModuleComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  public excelEnable = false;
  public csvEnable = false;
  public textEnable = false;
  public delEnable = false;

  public samePosition = false;
  public fileTypeAlert = false;

  public emailShow = false;
  public smsShow = false;

  public varSmsDisable = true;
  public varEmailDisable = true;


  fromvaueshow: Array<any> = [];


  ShowFilter = true;

  public monthshow = false;
  public weekshow = false;
  public dateshow = false;
  public hourshow = false;
  public minuteshow = false;

  public batchshow = false;
  public whiteListedId = false;
  public alert_module_required = false;

  public hideTab2:any;
  // private base64textString: any = "";

  sms_whitelist: any;
  file: any;
  file_name: any;
  conditionModel:Array<any> = [];
  colValFrom:Array<any> = [];
  colValTo:Array<any> = [];
  colVal:Array<any> = [];
  approver: Array<any> = [];
  approverSelected: any;
  whitelist_id:any;
  batch_duration:any
  alertTypeData:Array <any>=[];

  remove_row_ids:Array<any> = [];
  remove_row_text_ids:Array <any> = [];

  // alertTypeSelected: any;
  // file_type: any;
  arrayBuffer: any;
  filelist: any;
  map_input_file:Array <any> = [];
  map_variable:Array <any> = [];
  row_id:Array <any> = [];
  detailRowId:Array <any> = [];
  textRowId:Array<any> = [];
  map_email_variable:Array<any> = [];
  map_email_input_file:Array<any> = [];
  SMScolumnservices:Array<any> = [];
  conservices: Array<any> = [];
  conservice: Array<any> = [];
  columnservices: Array<any> = [];
  columnservice: Array<any> = [];
  
  getcolumns: any;
  template_sms: any;
  template_sms_generated:any;
  variable_sms: any;
  template_email: any;
  variable_email: any;
  converted_sms_str: any;
  converted_email_str: any;
  alert_name:any;
  alert_id:any;
  alert_type:any;
  mode_of_alert:any;
  file_source:any;
  file_path:any;

  myForm: any;
  selectedDateItems: Array<any> = [];
  selectedMonthItems: Array<any> = [];
  selectedYearItems: Array<any> = [];

  dateService: Array<any> = [];
  monthService: Array<any> = [];
  weekService: Array<any> = [];
  hourService: Array<any> = [];
  minuteService: Array<any> = [];

  hourServices:Array<any> = [];
  minuteServices:Array<any> = [];
  weekServices:Array<any>=[];
  monthServices:Array<any> = [];
  dateServices:Array<any> = [];
  // secondService:Array<any> = [];

  dropdownSettings: IDropdownSettings = {};
  dropdownSettings1: IDropdownSettings = {};
  // conjunctionsettings: IDropdownSettings = {};
  smsSettings:IDropdownSettings = {};
  closeDropdownSelection = false;
  disabled = false;

  finalsmsstring: any;
  finalemilstring: any;
  delimitor: any;
  file_ext: any;

  updateRulesData:Array<any> = [];
  updateSmsData:Array<any> = [];
  updateTextData:Array<any> = [];
  // pe_none:any;

  field_pos: Array<any> = [];
  col_pos_name: Array<any> = [];

  public createShow = false;

  showContent: any;
  allAlerts: Array<any> = [];
  viewAlert: any = {};
  closeResult: any;
  viweAllAlertId:any;
  rules : Array<any> = [];
  exec_mode:any;
  sms_mapping: Array<any> = [];
    // data table
    title = 'datatables';
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    //data table end

  constructor(public fb: FormBuilder,private appcomponent:AppComponent,private regCust: CustRegService
    ,private modalService: NgbModal,private CommonServices: CommonServicesService
    ) {


    
       
    this.smsSettings = {
      singleSelection: true,
      idField: 'val_id',
      textField: 'val_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    }

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'colmn_id',
      textField: 'colmn_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: this.ShowFilter
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'service_id',
      textField: 'display_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter
    };


    const items = [];
    const poscolitems = [];
    const mapsmscolitems= [];
    const mapemilcolitems = [];

    items.push(this.fb.group({
      col_name: [this.columnservice],
      condition: [""],
      col_value_from: [""],
      col_value_to: [""],
      col_value: [""],
      detail_row_id: [""]
    }));

    poscolitems.push(this.fb.group({
      col_pos_name: [this.col_pos_name],
      field_pos: [this.field_pos],
      text_row_id: [""]
    }));

    mapsmscolitems.push(this.fb.group({
      map_variable: [this.map_variable],
      map_input_file: [this.map_input_file],
      row_id:[this.row_id]
    }))

    mapemilcolitems.push(this.fb.group({
      map_email_variable: [this.map_email_variable],
      map_email_input_file: [""]
    }))

    this.myForm = fb.group({
      alert_id:[this.alert_id],
      alert_name: [this.alert_name],
      alert_type: [this.alert_type],
      mode_of_alert: [this.mode_of_alert],
      file_source: [this.file_source],
      file_path: [this.file_path],
      file_ext: [this.file_ext],
      file_name: [this.file_name],
      delimitor: [this.delimitor],
      variable_sms: [this.variable_sms],
      template_sms: [this.template_sms],
      template_sms_generated:[this.template_sms_generated],
      variable_email: [this.variable_email],
      template_email: [this.template_email],
      approver: [this.approverSelected],
      execution_mode: [this.exec_mode],
      date_wise: [this.dateServices],
      month_wise: [this.monthServices],
      hour_wise: [this.hourServices],
      minute_wise: [this.minuteServices],
      // second_wise:[""],
      week_wise: [this.weekServices],
      batch_duration: [this.batch_duration],
      sms_whitelist: [this.sms_whitelist],
      approver_id:[this.approverSelected],
      template_id: [this.whitelist_id],
      file: [""],
      action: [""],
      serviceId: [""],
      account_no:[""],
      tabid: [""],
      remove_row_ids:[""],
      remove_row_text_ids:[""],
      details: this.fb.array(items),
      position_cols: this.fb.array(poscolitems),
      map_sms_col:this.fb.array(mapsmscolitems),
      map_emial_col:this.fb.array(mapemilcolitems)
    });
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  }

  createAlert(){
    this.createShow = true;
     this.alert_id = "";
    setTimeout(() => {
    this.commonSelectTab(1);
    this.commonSelectTab(2);
    this.commonSelectTab(3);
    },25);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      processing: true,
      scrollX: true,
    };
    this.hideTab2 = false;

    this.mode_of_alert = "null";
    this.alert_type = "null";
    this.approverSelected = "null";
    this.exec_mode = "null";
    this.file_source = "null";
    this.file_ext = "null";

    var getServices = { action: 'allAlerts', tabid: localStorage.getItem('tabid') };
    this.regCust.custRegValidation2(getServices).subscribe(
      (response) => {
        console.log(response);
        this.allAlerts = response.allAlerts;
        this.showContent = true;
      });
    
    var getServices = { action: 'getAlertBasics', tabid: localStorage.getItem('tabid') };

    this.regCust.custRegValidation2(getServices).subscribe(
      (response) => {
       // console.log(response);
        this.alertTypeData = response.Alert_Type_Data;
        this.approver = response.Makers;
      });

    setTimeout(() => {
      const count: any = this.staticTabs?.tabs.length;
      for (let i = 1; i < count; i++) {
        if (this.staticTabs?.tabs[i]) {
          this.staticTabs.tabs[i].disabled = !this.staticTabs.tabs[i].disabled
        }
      }
    }, 500);

    this.monthService = [{ 'service_id': '01', 'display_name': 'Jan' }, { 'service_id': '02', 'display_name': 'Feb' }, { 'service_id': '03', 'display_name': 'Mar' }, { 'service_id': '04', 'display_name': 'Apr' }, { 'service_id': '05', 'display_name': 'May' }, { 'service_id': '06', 'display_name': 'Jun' }, { 'service_id': '07', 'display_name': 'Jul' }, { 'service_id': '08', 'display_name': 'Aug' }, { 'service_id': '09', 'display_name': 'Sep' }, { 'service_id': '10', 'display_name': 'Oct' }, { 'service_id': '11', 'display_name': 'Nov' }, { 'service_id': '11', 'display_name': 'Dec' }];
    this.weekService = [{ 'service_id': '01', 'display_name': 'Sun' }, { 'service_id': '02', 'display_name': 'Mon' }, { 'service_id': '03', 'display_name': 'Tue' }, { 'service_id': '04', 'display_name': 'Wed' }, { 'service_id': '05', 'display_name': 'Thus' }, { 'service_id': '06', 'display_name': 'Fri' }, { 'service_id': '07', 'display_name': 'Sat' }]
    for (var i = 1; i < 32; i++) {

      if(i<10){
        this.dateService.push({ 'service_id': '0'+i, 'display_name': '0'+i });
       }else{
        this.dateService.push({ 'service_id': i, 'display_name': i });
       }

      
    }
    this.dateService.push({ 'service_id': '33', 'display_name': 'First Day' });
    this.dateService.push({ 'service_id': '34', 'display_name': 'Last Day' });

    for (var i = 0; i <= 23; i++) {
      if (i == 0) {
        this.hourService.push({ 'service_id': i, 'display_name': '12 AM' });
      }
      else if (i <= 11) {
        this.hourService.push({ 'service_id': i, 'display_name': i + ' AM' });
      }
      else {
        this.hourService.push({ 'service_id': i, 'display_name': i + ' PM' });
      }
    }


    for (var i = 0; i < 60; i++) {
     if(i<10){
      this.minuteService.push({ 'service_id': '0'+i, 'display_name': '0'+i })
     }else{
      this.minuteService.push({ 'service_id': i, 'display_name': i })
     }
    }

    this.conservices = ['And', 'Or'];
  }

  coulmNameChange(ind: any) {
  //  console.log(this.col_pos_name);
    if (this.col_pos_name) {
      this.columnservices = [];
      for (var i = 0; i <= this.col_pos_name.length; i++) {
        if (this.col_pos_name[i] != undefined) {
          this.columnservices.push({ 'colmn_id': this.col_pos_name[i], 'colmn_name': this.col_pos_name[i] });
        }

      }
    }
  }

  addRow() {
    const details = this.myForm.get('details') as FormArray;
    details.push(this.createItem());
  }

  addCol() {
    const position_cols = this.myForm.get('position_cols') as FormArray;
    position_cols.push(this.createCol());
  }

  addSmsMap(){
    const map_sms_col = this.myForm.get('map_sms_col') as FormArray;
    map_sms_col.push(this.createSmsMap());
  }
  addEmailMap(){
    const map_emial_col = this.myForm.get('map_emial_col') as FormArray;
    map_emial_col.push(this.createEmailMap());
  }

  createItem(): FormGroup {
    return this.fb.group({
      col_name: [this.columnservice],
      condition: [""],
      col_value_from: [""],
      col_value_to: [""],
      col_value: [""],
      detail_row_id: [""]
    });
  }
 


  createCol(): FormGroup {
    return this.fb.group({
      col_pos_name: [this.col_pos_name],
      field_pos: [this.field_pos],
      text_row_id:[""]
    });
  }

  createSmsMap(): FormGroup{
    return this.fb.group({
      map_variable: [this.map_variable],
      map_input_file: [this.map_input_file],
      row_id: [this.row_id]
    });
  }
  createEmailMap(){
    return this.fb.group({
      map_email_variable: [this.map_email_variable],
      map_email_input_file: [this.map_email_input_file]
    });
  }

  deleteRow(index: any) {
 
    const details = this.myForm.get('details') as FormArray;
    this.remove_row_ids.push(this.detailRowId[index]);
    if (details.value.length > 1) {
      details.removeAt(index);
    }
  }

  deleteCol(index: any) {
    const position_cols = this.myForm.get('position_cols') as FormArray;
    this.remove_row_text_ids.push(this.textRowId[index]);
    if (position_cols.value.length > 1) {
      position_cols.removeAt(index);
    }
  }

  // deleteSmsMap(index: any) {
  //   const mapsmscol = this.myForm.get('mapsmscol') as FormArray;
  //   mapsmscol.removeAt(index);
  // }
  // deleteEmailMap(index: any) {
  //   const mapemialcol = this.myForm.get('mapemialcol') as FormArray;
  //     mapemialcol.removeAt(index);
  // }


  resetSmsMap(){
    const map_sms_col = this.myForm.get('map_sms_col') as FormArray;
    map_sms_col.reset();
    
  }
  resetEmailMap(){
    const map_emial_col = this.myForm.get('map_emial_col') as FormArray;
    map_emial_col.reset();
    
  }
  // conjunctionChange(event: any, ind: any) {
  //   this.conservices = [];
  //   this.conservices = ['And', 'Or'];
  //   if(event){
  //         this.addRow();  
  //   }
  // }

  smsColumnSelect(event:any){
    this.SMScolumnservices = [];
    this.getColumnHeaders();
  }

  addfile(event: any) {
    // event.target.files
    this.file = event.target.files[0];
    this.file_name = this.file.name;
     
    // console.log(this.file_ext);
    // console.log(this.file.name.split('.').pop());

    if(this.file.name.split('.').pop() == "xlsx" || this.file.name.split('.').pop() == "xls" && this.file_ext == "excel") {
      if (this.file) {
        this.excelEnable = true;
       this.getFileContent();
      }
    }else if(this.file.name.split('.').pop() == "csv" && this.file_ext == "csv"){
      if (this.file) {
        this.excelEnable = false;
       this.getFileContent();
      }
    }else if(this.file.name.split('.').pop() == "txt" && this.file_ext == "text"){
      if (this.file) {
        this.excelEnable = false;
       this.getFileContent();
      }
    }
    else {
      this.file = "";
      this.fileTypeAlert = true;
      setTimeout(() => { this.fileTypeAlert = false; }, 3000);
    }

  }


  getFileContent(){
    const details = this.myForm.get('details') as FormArray;
    details.removeAt(0);
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.getcolumns = arraylist[0];

     if(this.alert_id){
        this.columnservices = [];
        this.columnservice=[];
     }

      for (var property in this.getcolumns) {
        this.columnservices.push({ 'colmn_id': property, 'colmn_name': property }); // Outputs: foo, fiz or fiz, foo
      }
    // adding row  to the after appending column data
      this.addRow();
    
     
      this.filelist = [];
    }
  }

  

  getColumnHeaders(){
 
      for(var i = 0;i<this.columnservices.length;i++){
        this.SMScolumnservices[i] = this.columnservices[i].colmn_id
      }
 
  }

  selectTab(tabId: number) {
    // alert("wadasd");
   if(tabId == 1){
     if(this.alert_name !=undefined && this.alert_type !=undefined && this.mode_of_alert !=undefined){
      if(this.alert_name.length >0 && this.alert_type.length >0 && this.mode_of_alert.length >0){
        this.commonSelectTab(tabId)
      }
     }
     else{
       this.commonAlertWarningClose();
     }
   }
// for tab2 required fields
   if(tabId == 2){
    if(this.file_ext  == "excel"){
      if(this.file_source !=undefined && this.file_path !=undefined && this.file_ext !=undefined && this.file_name !=undefined &&  this.file != "" ){
        if(this.file_source.length >0 && this.file_path.length >0 && this.file_ext.length >0 && this.file_name.length > 0 && this.file.name.length > 0){
          this.commonSelectTab(tabId);
        }
       }else{
        this.commonAlertWarningClose();
      }
    }
    else if(this.file_ext  == "csv"){
      if(this.file_source !=undefined && this.file_path !=undefined && this.file_ext !=undefined && this.file_name !=undefined && this.delimitor != undefined &&  this.file != ""){
        if(this.file_source.length >0 && this.file_path.length >0 && this.file_ext.length >0 && this.file_name.length > 0 && this.delimitor.length >0 && this.file.name.length > 0){
          this.commonSelectTab(tabId);
        }
       }else{
        this.commonAlertWarningClose();
      }
    }
    else{
     
      if(this.file_source !=undefined && this.file_path !=undefined && this.file_ext !=undefined && this.file_name !=undefined){
        if(this.file_source.length >0 && this.file_path.length >0 && this.file_ext.length >0 && this.file_name.length > 0){
          this.commonSelectTab(tabId);
        }
       }else{
        this.commonAlertWarningClose();
      }
    }
     
    
   }

   if(tabId == 3){

  if(this.mode_of_alert == "sms"){
    if(this.template_sms !=undefined){
      if(this.template_sms.length >0){
        this.commonSelectTab(tabId);
      }
     }else{
      this.commonAlertWarningClose();
    }
  }

  if(this.mode_of_alert == "email"){
    if(this.template_email !=undefined){
      if(this.template_email.length >0){
        this.commonSelectTab(tabId);
      }
     }else{
       alert("asf");
      this.commonAlertWarningClose();
    }
  }

  if(this.mode_of_alert == "both"){
    if(this.template_email !=undefined && this.template_sms !=undefined){
      if(this.template_email.length >0 && this.template_sms.length >0){
        this.commonSelectTab(tabId);
      }
     }else{
      this.commonAlertWarningClose();
    }
  }
}
  //  this.commonSelectTab(tabId)
  }

  commonSelectTab(tabId:any){
    // console.log(tabId);
    // console.log(this.staticTabs?.tabs[tabId]);
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].disabled = !this.staticTabs.tabs[tabId].disabled
    }
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  commonAlertWarningClose(){
    this.alert_module_required = true;
    setTimeout(() => {
     this.alert_module_required = false;
   }, 3000);
  }

  smsWhitelist(value: any) {
    // console.log(value.currentTarget.checked);
    if (value.currentTarget.checked == true) {
      this.whiteListedId = true;
    } else {
      this.whiteListedId = false;
    }

  }

  executionModeChange() {
   
    if (this.exec_mode == "batch") {
      this.batchshow = true;
    } else {
      this.batchshow = false;
    }
  }

  Delimitor(value: any) {

    if (value.target.value) {
      this.excelEnable = true;
      // console.log(this.delimitor);
      if (this.delimitor == "|") {
        this.columnservices = [];
        for (var property in this.getcolumns) {
          this.columnservices.push({ 'colmn_id': property, 'colmn_name': property }); // Outputs: foo, fiz or fiz, foo
        }
      } else {
        var string_get = Object.keys(this.getcolumns);
        var result = string_get[0].split(this.delimitor).map(function (value: any) {
          return value.trim();
        });
        var filtercol = result;
        this.columnservices = [];
        for (var i = 0; i <= filtercol.length; i++) {
          this.columnservices.push({ 'colmn_id': filtercol[i], 'colmn_name': filtercol[i] }); // Outputs: foo, fiz or fiz, foo
        }
      }
    } else {
      this.excelEnable = false;
    }
  }

  extentionChange() {
      this.file = "";
     // alert(this.alert_id); 
      if (this.file_ext == "excel" || this.file_ext == "csv") {
        if(this.alert_id){
          this.excelEnable = true;  
        }else{
          this.excelEnable = false;
        }
        this.delEnable = false;
        this.csvEnable = true;
        this.textEnable = false;
        if (this.file_ext == "csv") {
          this.delEnable = true;
          if(this.alert_id){
            this.excelEnable = true;  
          }else{
            this.excelEnable = false;
          }
        }
      }
      if (this.file_ext == "text") {
        this.excelEnable = true;
        this.textEnable = true;
        this.delEnable = false;
        this.csvEnable = false;
      }   
  }

  dateTimeChange() {
    //console.log(this.batch_duration);
    this.weekServices = [];
    this.monthServices = [];
    this.dateServices = [];
    this.hourServices = [];
    this.minuteServices = [];

    if (this.batch_duration == "daily") {

      this.monthshow = false;
      this.weekshow = false;
      this.dateshow = false;
      this.hourshow = true;
      this.minuteshow = true;
    } else if (this.batch_duration == "weekly") {

      this.monthshow = false;
      this.weekshow = true;
      this.dateshow = false;
      this.hourshow = true;
      this.minuteshow = true;
    } else if (this.batch_duration == "monthly") {

      this.monthshow = false;
      this.weekshow = false;
      this.dateshow = true;
      this.hourshow = true;
      this.minuteshow = true;
    } else if (this.batch_duration == "yearly") {

      this.monthshow = true;
      this.weekshow = false;
      this.dateshow = true;
      this.hourshow = true;
      this.minuteshow = true;
    }
  }

  alertModeChange(value: any) {

    // console.log(value);
    if (value == "sms") {
      this.smsShow = true;
      this.emailShow = false;
      this.template_email = "";
      this.variable_email = "";
      this.converted_email_str = "";
      this.map_email_variable = [];
      //  this.resetEmailMap();

    }
    if (value == "email") {
      this.smsShow = false;
      this.emailShow = true;
      this.template_sms = "";
      this.variable_sms = "";
      this.converted_sms_str = "";
      this.map_variable = [];
      // this.resetSmsMap();
    }
    if (value == "both") {
      this.emailShow = true;
      this.smsShow = true;
    }
  }

 

  conditionBetween(ind: any) {

    if (this.conditionModel[ind] == "Between") {
      this.fromvaueshow[ind] = ind;
    } else {
      this.fromvaueshow.splice(ind, 1);
    }

  }


  variableSmsValidation(value: any) {

    var result1 = [];
    this.map_variable = [];
   
    var str = value.target.value;
    result1 = str.match(/<(.*?)>/ig);

    if(result1 != null){

      const map_sms_col = this.myForm.get('map_sms_col') as FormArray;
      map_sms_col.removeAt(0);
      for(var i=0;i<result1.length;i++){
        // result1[i]
        if(result1[i] != undefined){
         map_sms_col.removeAt(i);
         this.addSmsMap();
         this.map_variable[i] =result1[i];
        }
       }

       this.getColumnHeaders();
       this.varSmsDisable = false;
    }
    else{
      this.varSmsDisable = true;
    }

  }


  variableEmailValidation(value: any) {

    var result1 = [];
    this.map_email_variable = [];

    var str = value.target.value;
    result1 = str.match(/<[\w\d]+>/g);

    if(result1 != null){

      const map_emial_col = this.myForm.get('map_emial_col') as FormArray;
      map_emial_col.removeAt(0);
      for(var i=0;i<result1.length;i++){
       // result1[i]
       if(result1[i] != undefined){
        map_emial_col.removeAt(i);
        this.addEmailMap();
        this.map_email_variable[i] =result1[i];
       }
       
      }
      this.getColumnHeaders();

       this.varEmailDisable = false;
    }
    else{
      this.varEmailDisable = true;
    }

}

  generateEmailTemplate() {

    //console.log(this.variable_email);
    var replaceToSingle = this.variable_email;
    replaceToSingle = replaceToSingle.replace(/,+/g,","); // as that replaces any one or more instances of , with only one ,.
    
    var result = replaceToSingle.split(",").map(function (value: any) {
      var trimdata = value.trim();
      return {[trimdata]:'<'+trimdata+'>'};
    });
  // console.log(result);
    // mpping object by keys
    var result1 = replaceToSingle.split(",").map(function (value: any) {   
      return value.trim();
    });


    const map_emial_col = this.myForm.get('map_emial_col') as FormArray;
    map_emial_col.removeAt(0);
   
    //console.log(result1);
    for(var i=0;i<result1.length;i++){
     // result1[i]
     if(result1[i] != undefined){
      map_emial_col.removeAt(i);
      this.addEmailMap();
      this.map_email_variable[i] ="<"+result1[i]+">";
     }
     
    }
    
    this.finalemilstring = result1.toString();  // converting array to string
    var jsonstr = JSON.stringify(result);  // converting array object to string
  
    var mapObj = jsonstr.split('},{').join(',').replace('[',"").replace(']',""); // removing and adding and replacing to become an perfect object

    mapObj = JSON.parse(mapObj); // converting string to object again

    var str = this.template_email; // template taken in input 

    this.converted_email_str = str.replace(new RegExp(this.finalemilstring.replaceAll(',', '|'), 'gi'),function(matched: string | any){
      return mapObj[matched];
    })
    this.getColumnHeaders();

  }


  generateSmsTemplate() {
     // map object to key value pair convertion 
   // console.log(this.variable_sms);
    var replaceToSingle = this.variable_sms;
    replaceToSingle = replaceToSingle.replace(/,+/g,","); // as that replaces any one or more instances of , with only one ,.

    var result = replaceToSingle.split(",").map(function (value: any) {
      var trimdata = value.trim();
        return {[trimdata]:'<'+trimdata+'>'};
    });

    

    // mpping object by keys
    var result1 = replaceToSingle.split(",").map(function (value: any) {   
      return value.trim();
    });

    // console.log(result1);

    const map_sms_col = this.myForm.get('map_sms_col') as FormArray;
    map_sms_col.removeAt(0);
   

    for(var i=0;i<result1.length;i++){
     // result1[i]
     if(result1[i] != undefined){
      map_sms_col.removeAt(i);
      this.addSmsMap();
      this.map_variable[i] ="<"+result1[i]+">";
     }
     
    }


    // addSmsMap
    
    this.finalsmsstring = result1.toString();  // converting array to string
    var jsonstr = JSON.stringify(result);  // converting array object to string
//console.log(jsonstr);
    var mapObj = jsonstr.split('},{').join(',').replace('[',"").replace(']',""); // removing and adding and replacing to become an perfect object

    mapObj = JSON.parse(mapObj); // converting string to object again

    var str = this.template_sms; // template taken in input 

  //  console.log(new RegExp(this.finalsmsstring.replaceAll(',', '|'), 'gi'));
  //  console.log(mapObj);

    this.converted_sms_str = str.replace(new RegExp(this.finalsmsstring.replaceAll(',', '|'), 'gi'),function(matched: string | any){
        //console.log(mapObj[matched]);
        return mapObj[matched]
        
    })
    this.getColumnHeaders();
    // console.log(this.columnservices);
   // this.converted_sms_str = str.replace(new RegExp(this.finalsmsstring.replaceAll(',', '|'), 'gi'), '$var$');
  }

  positionValidation(event:any,ind:any){
    if(this.field_pos[ind-1].split('-')[1] == this.field_pos[ind][0]){
      var str = this.field_pos;
      this.field_pos = str.slice(0, -1);
      this.samePosition = true;
      setTimeout(() => { this.samePosition = false; }, 3000);
    }else{
     this.samePosition = false;
    }
  }

  
  open(content: any, alert: any){

    this.CommonServices.alertView(content, alert);
    setTimeout(() => { 
      this.viewAlert  = this.CommonServices.viewAlert;
      this.rules = this.CommonServices.rules;
      this.sms_mapping = this.CommonServices.sms_mapping;
    }, 100);
  
    // var getAlertDetails = { action: 'viewAlert', alert_id: alert.alert_id, tabid: localStorage.getItem('tabid') };
    // this.regCust.custRegValidation2(getAlertDetails).subscribe(
    //   (response) => {
    //    console.log(response.sms_mapping[0].value1[0].val_name);
    //     if (response.status == "Success") {
    //       this.viewAlert  = response.Alert;
    //       this.rules = response.details;
    //       this.sms_mapping = response.sms_mapping;
    //     }
    //   });
 
    // this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });

}

// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return `with: ${reason}`;
//   }
// }

viewAllUpdate(alert:any){
  // console.log(alert);
  this.reset();
    var getAlertDetails = { action: 'viewAlert', alert_id: alert.alert_id, tabid: localStorage.getItem('tabid') };
     this.viweAllAlertId = alert.alert_id;
    this.regCust.custRegValidation2(getAlertDetails).subscribe(
      (response) => {
       console.log(response);
       this.createShow = true;
      this.alert_id = response.Alert.alert_id;
      this.alert_name = response.Alert.alert_name;
      this.alert_type = response.Alert.alert_type;
      this.mode_of_alert = response.Alert.mode_of_alert;
      this.file_source = response.Alert.file_source;
      this.file_path = response.Alert.file_path;
      this.file_name = response.Alert.file_name_format;
      this.file_ext = response.Alert.file_extension;
      this.approverSelected = response.Alert.approved_by;
      this.whitelist_id = response.Alert.whitelist_id; 
      this.batch_duration= response.Alert.batch_exec_on;
      this.dateTimeChange();
      
  if(response.Alert.hour != null){
    var hrarr = response.Alert.hour.split(':');
    for(var i = 0;i<hrarr.length;i++){
      var hrarrmain = hrarr[i].split(',');
      this.hourServices.push({service_id: Number(hrarrmain[0]), display_name: hrarrmain[1]});
    }
  }else{
    this.hourServices = [];
  }
  if(response.Alert.minute != null){
    var minarr = response.Alert.minute.split(':');
    for(var i = 0;i<minarr.length;i++){
      var minarrmain = minarr[i].split(',');
      this.minuteServices.push({service_id: minarrmain[0], display_name: minarrmain[1]});
    }
  }else{
    this.minuteServices = [];
  }
  
  if(response.Alert.month != null){
    var monarr = response.Alert.month.split(':');
    for(var i = 0;i<monarr.length;i++){
      var monarrmain = monarr[i].split(',');
      this.monthServices.push({service_id: monarrmain[0], display_name: monarrmain[1]});
    }
  }else{
    this.monthServices = [];
  }

  if(response.Alert.alert_date != null){
    var datearr = response.Alert.alert_date.split(':');
    for(var i = 0;i<datearr.length;i++){
      var datearrmain = datearr[i].split(',');
      this.dateServices.push({service_id: datearrmain[0], display_name: datearrmain[1]});
    }
  }else{
    this.dateServices = [];
  }
  // console.log(this.dateServices);
  if(response.Alert.day != null){
    var dayarr = response.Alert.day.split(':');
    for(var i = 0;i<dayarr.length;i++){
      var dayarrmain = dayarr[i].split(',');
      this.weekServices.push({service_id: dayarrmain[0], display_name: dayarrmain[1]});
    }
  }else{
    this.weekServices = [];
  }
  
      if(response.Alert.white_listed_status == 1){
        this.sms_whitelist = 'T';
        this.whiteListedId = true;
      }else{
        this.sms_whitelist = 'F';
        this.whiteListedId = false;
      }

      if(response.Alert.sms_template != null){
        var str = response.Alert.sms_template;
        var result1 = str.match(/<(.*?)>/ig);
          if(result1.length > 0){
            this.varSmsDisable = false;
          }else{
            this.varSmsDisable = true;
          }
      }
  
 
      // variableSmsValidation
      this.alertModeChange(response.Alert.mode_of_alert); 
      this.extentionChange();
      this.template_sms =  response.Alert.sms_template;
      this.variable_sms =  response.Alert.sms_variables
      this.template_email = response.Alert.email_template;
      this.variable_email =  response.Alert.email_variables;
      this.exec_mode  = response.Alert.exec_mode;
      this.executionModeChange();

   
      this.updateRulesData = response.details;
        for( let i=0; i <this.updateRulesData.length; i++){
          this.addRow();
         this.columnservice[i] = this.updateRulesData[i].input_field_name;
         this.conditionModel[i] = this.updateRulesData[i].condition ;
         this.conditionBetween(i);
         this.detailRowId[i] = this.updateRulesData[i].row_id;
         if(this.updateRulesData[i].value2 == null){
          this.colVal[i] = this.updateRulesData[i].value1;
         }else{
          this.colValFrom[i] = this.updateRulesData[i].value1;
          this.colValTo[i] = this.updateRulesData[i].value2;
         }
      }
// console.log(response.details);
      if(response.details){
        for( let i=0; i <this.updateRulesData.length; i++){
          for( let j=0; j <this.updateRulesData[i].input_field_service.length; j++){
             this.columnservices.push({ 'colmn_id': this.updateRulesData[i].input_field_service[j], 'colmn_name': this.updateRulesData[i].input_field_service[j]});
          }
       }
      }
        const ruleDetails = this.myForm.get('details') as FormArray;
        ruleDetails.removeAt(this.updateRulesData.length);

        if(response.details.length == 0){
          this.addRow();
        }

        if( response.sms_mapping){
          this.updateSmsData = response.sms_mapping;
          for( let i=0; i <this.updateSmsData.length; i++){
           this.addSmsMap();
           this.SMScolumnservices.push({ 'val_id': this.updateSmsData[i].value1[0].val_id, 'val_name': this.updateSmsData[i].value1[0].val_name });
           this.map_input_file[i] = this.updateSmsData[i].value1;
           this.map_variable[i] = this.updateSmsData[i].input_field_name;
           this.row_id[i] = this.updateSmsData[i].row_id;
        } 
        //console.log(this.SMScolumnservices);
        const smsDetails = this.myForm.get('map_sms_col') as FormArray;
        smsDetails.removeAt(this.updateSmsData.length);
        }
        if( response.column_mapping){
          this.columnservices = [];
          this.updateTextData = response.column_mapping;
          for( let i=0; i <this.updateTextData.length; i++){
            this.addCol();
           
            this.columnservices.push({ 'colmn_id': this.updateTextData[i].input_field_name, 'colmn_name': this.updateTextData[i].input_field_name});
           this.field_pos[i] = this.updateTextData[i].value1;
           this.col_pos_name[i] = this.updateTextData[i].input_field_name;
           this.textRowId[i] = this.updateTextData[i].row_id;
        } 

        const PosCol = this.myForm.get('position_cols') as FormArray;
        PosCol.removeAt(this.updateTextData.length);
        }
      });
}

reset(){
 this.createShow=false;
 this.csvEnable = false;
 this.delEnable = false;
 this.whiteListedId = false;
 this.batchshow = false;
 this.monthshow = false;
 this.weekshow = false;
 this.dateshow = false;
 this.hourshow = false;
 this.minuteshow = false;
  // this.alert_id = "";
  this.mode_of_alert = "null";
  this.alert_type = "null";
  this.approverSelected = "null"
  this.exec_mode = "null";
  this.file_source = "null";
  this.file_ext = "null";

  this.alert_name = "";
  this.file_path = "";
  this.file_name = "";
  this.template_sms =  "";
  this.variable_sms =  "";
  this.template_email = "";
  this.variable_email =  "";
  this.hourServices=[];
  this.minuteServices=[];
  this.monthServices=[];
  this.dateServices=[];
  this.weekServices=[];
  this.columnservice = [];
  this.columnservices = [];
  this.colValFrom=[];
  this.colValTo=[];
  this.colVal=[];
  this.conditionModel=[];
  this.map_variable=[];
  this.map_input_file=[];
  this.map_email_variable=[];
  this.map_email_input_file=[];
  this.field_pos=[];
  this.col_pos_name=[];
  this.row_id=[];
  this.detailRowId = [];
  this.textRowId = [];
  this.whitelist_id="";
  this.batch_duration="";
  this.sms_whitelist = "";
  this.remove_row_ids=[];
  this.remove_row_text_ids=[];

  const PosCol = this.myForm.get('position_cols') as FormArray;
  var poscount = PosCol.value.length;
  for (let i = 1; i < poscount ; i++) {
    PosCol.removeAt(0);
  }

  const smsDetails = this.myForm.get('map_sms_col') as FormArray;
  var SMScount = smsDetails.value.length;
  for (let i = 1; i < SMScount ; i++) {
    smsDetails.removeAt(0);
  }

  const ruleDetails = this.myForm.get('details') as FormArray;
  var Rulecount = ruleDetails.value.length;
  for (let i = 1; i < Rulecount ; i++) {
    ruleDetails.removeAt(0);
  }
}


  submitAlert() {
//console.log(this.myForm.value.alert_id);
    if(this.myForm.value.alert_id != undefined && this.myForm.value.alert_id != ""){
 
    // console.log(this.batch_duration);
    if(this.batch_duration == "yearly"){
      this.myForm.controls['week_wise'].setValue([]);
    }
    if(this.batch_duration == "monthly"){
      this.myForm.controls['month_wise'].setValue([]);
      this.myForm.controls['week_wise'].setValue([]);
    }
    if(this.batch_duration == "weekly"){
      this.myForm.controls['month_wise'].setValue([]);
      this.myForm.controls['date_wise'].setValue([]);
    }
    if(this.batch_duration == "daily"){
      this.myForm.controls['month_wise'].setValue([]);
      this.myForm.controls['date_wise'].setValue([]);
      this.myForm.controls['week_wise'].setValue([]);
    }
      this.myForm.controls['action'].setValue('updateAlertModule');
      this.myForm.controls['remove_row_ids'].setValue(this.remove_row_ids)
      this.myForm.controls['remove_row_text_ids'].setValue(this.remove_row_text_ids);
    }else{
      this.myForm.controls['action'].setValue('addAlertModule');
      this.myForm.controls['serviceId'].setValue(this.appcomponent.tranServiceId);
    }

    // Default select null to back end empty send in api
    if(this.mode_of_alert == "null"){
      this.myForm.controls['mode_of_alert'].setValue('');
    }
    if(this.alert_type == "null"){
      this.myForm.controls['alert_type'].setValue('');
    }
    if(this.file_source == "null"){
      this.myForm.controls['file_source'].setValue('');
    }
    if(this.approverSelected == "null"){
      this.myForm.controls['approver'].setValue('');
      this.myForm.controls['approver_id'].setValue('');
    }
    if(this.exec_mode == "null"){
      this.myForm.controls['execution_mode'].setValue('');
    }
    if(this.file_ext == "null"){
      this.myForm.controls['file_ext'].setValue('');
    }
   
    

    this.myForm.controls['tabid'].setValue(localStorage.getItem('tabid'));
    console.log(this.myForm.value);
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
          this.reset();
          this.alertTypeData = response.Alert_Type_Data;
          // Alert_Type_Data
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<div style="font-size:20px">' + response.errorDesc + '</div>',
            showConfirmButton: false,
            timer: 4000
          })
        }
       
      });
  }

}
