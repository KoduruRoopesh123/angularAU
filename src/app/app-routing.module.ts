import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_component/login/login.component';
import { HomeComponent } from './_component/home/home.component';
import { RoleComponent } from './_component/role/role.component';
import { DepartmentComponent } from './_component/department/department.component';
import { ServiceComponent } from './_component/service/service.component';
import { TransactionReportComponent } from './_component/reports/transaction-report/transaction-report.component';
import { IdamReportComponent } from './_component/reports/idam-report/idam-report.component';
import { InboxComponent } from './_component/inbox/inbox.component';
import { EmionposComponent } from './_component/emionpos/emionpos.component';
import { EmiOnPosTransactionsComponent } from './_component/reports/emi-on-pos-transactions/emi-on-pos-transactions.component';
import { AuthorizationReportComponent } from './_component/reports/authorization-report/authorization-report.component';
import { UserManagmentComponent } from './_component/user-managment/user-managment.component';
import { AlertModuleComponent } from './_component/alert-module/alert-module.component';
import { AlertFileUploadComponent }from './_component/alert-file-upload/alert-file-upload.component';
import { ViewAllAlertsComponent } from './_component/view-all-alerts/view-all-alerts.component';
import { DwhUploadFileComponent } from './_component/dwh-upload-file/dwh-upload-file.component';
import { AutoDebitUploadComponent } from './_component/auto-debit-upload/auto-debit-upload.component';
import { PreInstaLoanUploadComponent } from './_component/pre-insta-loan-upload/pre-insta-loan-upload.component';
import { AutoDebitRequestComponent } from './_component/reports/auto-debit-request/auto-debit-request.component';
import { AutoDebitEodReportComponent } from './_component/reports/auto-debit-eod-report/auto-debit-eod-report.component';
import { AutoDebitValidDataComponent } from './_component/reports/auto-debit-valid-data/auto-debit-valid-data.component';
import { PreInstaLoanRequestReportComponent } from './_component/reports/pre-insta-loan-request-report/pre-insta-loan-request-report.component';
import { PreInstaLoanTransactionReportComponent } from './_component/reports/pre-insta-loan-transaction-report/pre-insta-loan-transaction-report.component';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard]},
  { path: 'role', component: RoleComponent,canActivate:[AuthGuard]},
  { path: 'inbox', component: InboxComponent,canActivate:[AuthGuard]},
  { path: 'emi_on_pos', component: EmionposComponent,canActivate:[AuthGuard]},
  { path: 'modules', component: DepartmentComponent,canActivate:[AuthGuard]},
  { path: 'service', component: ServiceComponent, canActivate:[AuthGuard]},
  { path: 'transaction_report', component:TransactionReportComponent, canActivate:[AuthGuard]},
  { path: 'idam_requests_report', component:IdamReportComponent, canActivate:[AuthGuard]},
  { path: 'emi_on_pos_transactions', component:EmiOnPosTransactionsComponent, canActivate:[AuthGuard]},
  { path: 'auth_report', component:AuthorizationReportComponent,canActivate:[AuthGuard]},
  { path: 'user_management',component:UserManagmentComponent,canActivate:[AuthGuard]},
  { path: 'alert_module',component:AlertModuleComponent,canActivate:[AuthGuard]},
  { path: 'alert_file_upload',component:AlertFileUploadComponent,canActivate:[AuthGuard]},
  { path: 'alert_request_report',component:ViewAllAlertsComponent,canActivate:[AuthGuard]},
  { path: 'dwh_upload',component:DwhUploadFileComponent,canActivate:[AuthGuard]},
  { path: 'autodebit_upload',component:AutoDebitUploadComponent,canActivate:[AuthGuard]},
  { path: 'pre_insta_loan_upload',component:PreInstaLoanUploadComponent,canActivate:[AuthGuard]},
  { path: 'autodebit_report',component:AutoDebitRequestComponent,canActivate:[AuthGuard]},
  { path: 'autodebit_eod_report',component:AutoDebitEodReportComponent,canActivate:[AuthGuard]},
  { path: 'autodebit_valid_data_report',component:AutoDebitValidDataComponent,canActivate:[AuthGuard]},
  { path: 'pre_insta_loan_request_report',component:PreInstaLoanRequestReportComponent,canActivate:[AuthGuard]},
  { path: 'pre_insta_loan_transaction_report',component:PreInstaLoanTransactionReportComponent,canActivate:[AuthGuard]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
