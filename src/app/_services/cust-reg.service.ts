import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
// import { CustRegVal } from '../_models/cust-reg-val';

@Injectable({
providedIn: 'root'
})

export class CustRegService {
	constructor(
			private http :HttpClient
		   ) { 
			   
	}
    //    UAT web url
	// basePath = 'http://10.57.14.13:9080/CSS_Portal_App/CSS_Portal_Services.php';    
    //    DEV web url
	   basePath = 'http://10.57.8.35:9080/CSS_Portal_App/CSS_Portal_Services.php';

	httpOptions = {
			headers: new HttpHeaders({
			 'Content-Type': 'text/plain',
			 //observe: 'response'
			 },
			)
	};

	handleError(error: HttpErrorResponse){
		if( error.error instanceof ErrorEvent){
			//Client Side error
			console.error('Error Occurred:', error.error.message);
		}
		else {
			//Server Side Error
			console.error(`Server Error Code: ${error.status},`+`Body ${error.error}`);
		}
		return throwError(
			''
				//'Something went wrong; Pls try later'
		);
	}

	// custRegValidation(data): Observable<CustRegVal> {
	// 	return this.http.post<CustRegVal>(this.basePath, data, this.httpOptions)
	// 		.pipe(
	// 				retry(2),
	// 				catchError(this.handleError)
	// 		     );
	// }

	custRegValidation1(data:any): Observable<any> {
		return this.http.post<any>(this.basePath, data, this.httpOptions)
			.pipe(
					retry(2),
					catchError(this.handleError)
			     );
	}

	allowNameSpace(nameandspace: any){
		let regx = new RegExp("^[a-zA-Z ]*$").test(nameandspace)
	  return regx;
	}

	custRegValidation2(data: any): Observable<any> {

		return this.http.post<any>(this.basePath, data, this.httpOptions);
		 
	}

	upload(file:any):Observable<any> {
  
		// Create form data
		const formData = new FormData(); 
		  
		// Store form name as "file" with file data
		formData.append("file", file, file.name);
		  
		// Make http post request over api
		// with formData as req
		return this.http.post<any>(this.basePath, formData, this.httpOptions)
	}

	// custRegValidationObserve(data):Observable<any> {
	//  return this.http.post<any>(this.basePath, data, {observe: 'response'}).pipe(
	//    map(user => {
	//      console.log(user);
	//      return user;
	//    })
	//  );
	// }

	// mobileAuthentication(data): Observable<CustRegVal>{
	// 	return this.http.post<CustRegVal>(this.basePath, data, this.httpOptions)
	// 		.pipe(
	// 				retry(2),
	// 				catchError(this.handleError)
	// 		     );
	// }

	// resendCustOtp(data): Observable<CustRegVal>{
	// 	return this.http.post<CustRegVal>(this.basePath, data, this.httpOptions)
	// 		.pipe(
	// 				retry(2),
	// 				catchError(this.handleError)
	// 		     );
	// }

	// getDate()
	// {
	// 	 var dateFormat = require('dateformat');
	// 	 var now = new Date();
	// 	 let date = dateFormat(now, "dd/mmm/yyyy hh:MM:ss TT");
	// 	 return date;
	// }

	// setTempReg(resp: CustRegVal){
	// 	sessionStorage.setItem('TempRegSessId',resp.sessionId);
	// }

}
