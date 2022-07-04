import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './_component/login/login.component';
import { HomeComponent } from './_component/home/home.component';
import { RoleComponent } from './_component/role/role.component';
import { ServiceComponent } from './_component/service/service.component';
import { DepartmentComponent } from './_component/department/department.component';
import { InboxComponent } from './_component/inbox/inbox.component';
import { EmionposComponent } from './_component/emionpos/emionpos.component';
import { EmiOnPosTransactionsComponent } from './_component/reports/emi-on-pos-transactions/emi-on-pos-transactions.component';
import { UserManagmentComponent } from './_component/user-managment/user-managment.component';
import { AlertModuleComponent } from './_component/alert-module/alert-module.component';
import { AlertFileUploadComponent } from './_component/alert-file-upload/alert-file-upload.component';
import { ViewAllAlertsComponent } from './_component/view-all-alerts/view-all-alerts.component';
import { DwhUploadFileComponent } from './_component/dwh-upload-file/dwh-upload-file.component';
import { AutoDebitUploadComponent } from './_component/auto-debit-upload/auto-debit-upload.component';
import { PreInstaLoanUploadComponent } from './_component/pre-insta-loan-upload/pre-insta-loan-upload.component';


//Dependancys
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './auth.guard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BnNgIdleService } from 'bn-ng-idle';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//reports
import { TransactionReportComponent } from './_component/reports/transaction-report/transaction-report.component';
import { IdamReportComponent } from './_component/reports/idam-report/idam-report.component';
import { AuthorizationReportComponent } from './_component/reports/authorization-report/authorization-report.component';
import { AutoDebitRequestComponent } from './_component/reports/auto-debit-request/auto-debit-request.component';
import { AutoDebitEodReportComponent } from './_component/reports/auto-debit-eod-report/auto-debit-eod-report.component';
import { AutoDebitValidDataComponent } from './_component/reports/auto-debit-valid-data/auto-debit-valid-data.component';
import { PreInstaLoanRequestReportComponent } from './_component/reports/pre-insta-loan-request-report/pre-insta-loan-request-report.component';
import { PreInstaLoanTransactionReportComponent } from './_component/reports/pre-insta-loan-transaction-report/pre-insta-loan-transaction-report.component';


//services
import { RemovewhitespacesPipe } from './custompipes/removewhitespaces.pipe';
import { CommonServicesService } from './_services/common-services.service';


// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RoleComponent,
    ServiceComponent,
    DepartmentComponent,
    TransactionReportComponent,
    IdamReportComponent,
    RemovewhitespacesPipe,
    InboxComponent,
    EmionposComponent,
    EmiOnPosTransactionsComponent,
    AuthorizationReportComponent,
    UserManagmentComponent,
    AlertModuleComponent,
    AlertFileUploadComponent,
    ViewAllAlertsComponent,
    DwhUploadFileComponent,
    AutoDebitUploadComponent,
    PreInstaLoanUploadComponent,
    AutoDebitRequestComponent,
    AutoDebitEodReportComponent,
    AutoDebitValidDataComponent,
    PreInstaLoanRequestReportComponent,
    PreInstaLoanTransactionReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgbModule,
    ButtonsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot()
    // BsDropdownModule
  ],
  providers: [AuthService,AuthGuard,BnNgIdleService,CommonServicesService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
