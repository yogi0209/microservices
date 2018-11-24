import { Injectable } from "@angular/core";
import {Http, Headers, ResponseContentType} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { FacebookAuth } from "../navbar/FacebookAuth";
import { Observer } from "rxjs/Observer";
import { HttpService } from "./HttpService";
import { ListApplication } from "../applications-list/index";

import { LoanApplication } from "../../../lib/components/dashboard/LoanApplication";


@Injectable()
export class VerificationService {

    private baseUrl = 'https://evoke-staging.jocatagrid.in/Evoke/webservices/ident/';


    IndividualVerificationUrls = {
        "PAN": { url: this.baseUrl + 'getPanInformation' },
        "Driving License": { url: this.baseUrl + 'getDriversLicInfo' },
        "BSNL Bill": { url: this.baseUrl + 'getBsnlInformation' },
        "Water Bill": { url: this.baseUrl + 'getWaterBillInfo' },
        "LPG Bill": { url: this.baseUrl + 'getLPGInfo' },
        "Aadhaar": { url: this.baseUrl + 'getAadhaarAuthentication' }
    }

    constructor(private httpService: HttpService) {
        //this.getApplicationList();
        if(window.location.host.toLowerCase().indexOf("www.loanframe.com") > -1){
            this.baseUrl='https://evoke.jocatagrid.in/Evoke/webservices/ident/'
        }
    }
    // localInternal="http://35.154.98.63:19019/";
    localInternal="http://localhost:19019/";
    //base = window.location.host.toLowerCase().indexOf("www.loanframe.com") > -1 ? "https://www.loanframe.com/internal/" : window.location.host.toLowerCase().indexOf("staging-uat1.loanframe.com") > -1 ? "https://staging-uat1.loanframe.com/internal/" : this.localInternal;


    public getVerificationAuthToken(): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("/back-office/api/verification/token", { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getAllVerificationResultsEntity(obj): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("/back-office/api/loan/" + obj.loanId + "/verification/entity/" + obj.id + "/results", { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getAllBSAResults(loanId: any, entityId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));

            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`https://staging-uat1.loanframe.com/internal/bank-statement/api/result-summary/loan/${loanId}/entity/${entityId}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }




    public getUploadSummary(loanId: any): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/upload-summary/loan/${loanId}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getSummaryPull(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/pull-record/loan/${loanId}/account/${accountUID}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }


    public saveLoanDataAnaylysis(accountDetail: any={}, params): Promise<any> {
        console.log(accountDetail)
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put(`${this.base}bank-statement/api/update-loan-analysis/loan/${accountDetail.loanId}/account/${accountDetail.accountUID}`,JSON.stringify(params.loanDataAnalyses), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getVerificationEntities(loanId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("https://staging-uat1.loanframe.com/back-office/api/loan/" + loanId + "/verification/entities", { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getSummaryVerificationResults(loanId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("https://staging-uat1.loanframe.com/back-office/api/loan/" + loanId + "/verification/results/all", { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }
    public getSummaryBSAResults(loanId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/upload-summary/loan/${loanId}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getBSAAccount(obj):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`https://staging-uat1.loanframe.com/internal/bank-statement/api/result-summary/loan/${obj.loanId}/account/${obj.accountUID}`, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data=> {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getSummaryOfTotals(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/summary-of-totals`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getMonthlyAnalysis(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/monthly-analysis`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getCreditBreakUp(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/credit-breakup`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getDebitBreakUp(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/debit-breakup`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getLoanTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/loan-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getPenalties(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/penalties`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getInternalTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/internal-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getHighValueTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/high-value-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getAllTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`https://staging-uat1.loanframe.com/internal/bank-statement/api/loan/${loanId}/account/${accountUID}/all-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getInwardChequeTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/inward-cheque-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getOutwardChequeTransactions(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/outward-cheque-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getCreditSanctionedLimitAnalysis(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/credit-sanctioned-limit-analysis`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getCashDeposits(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/cash-deposits`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getNonBusiness(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/non-business-transactions`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getInterest(loanId: any, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/interest`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getCreditChartData(loanId, entityId):Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`https://staging-uat1.loanframe.com/internal/bank-statement/api/cash-credit-chart-data/loan/${loanId}/entity/${entityId}`, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data=> {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }
    public getBSASummaryTotalsData(loanId, entityId):Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`https://staging-uat1.loanframe.com/internal/bank-statement/api/summary-totals-data/loan/${loanId}/entity/${entityId}`, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data=> {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addVerificationEntities(loanId, params): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post("https://staging-uat1.loanframe.com/back-office/api/loan/" + loanId + "/verification/entity", JSON.stringify(params), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addVerificationResultEntity(obj, params): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post("https://staging-uat1.loanframe.com/back-office/api/loan/" + obj.loanId + "/verification/entity/" + obj.id + "/result", JSON.stringify(params), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public editVerificationResultEntity(obj, result, params): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put("https://staging-uat1.loanframe.com/back-office/api/loan/" + obj.loanId + "/verification/entity/" + obj.id + "/result/" + result, JSON.stringify(params), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public deleteVerificationEntities(loanId, entityId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.delete("https://staging-uat1.loanframe.com/back-office/api/loan/" + loanId + "/verification/entity/" + entityId, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }
    public deleteBsaAccount(loanId, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.delete(`${this.base}bank-statement/api/delete-summary/loan/${loanId}/account/${accountUID}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    progress:number;
    progressObserver:Observer<number>;

    public createNewBankAccount(loanId,entityId,formData:FormData):Observable<number> {
        return Observable.create(observer => {
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            let url=`${this.base}bank-statement/api/upload-multiple-statement/loan/${loanId}/entity/${entityId}`

            xhr.onload = (e)=> {
                if (xhr.readyState == 4 && xhr.status != 200) {
                    this.httpService.handlerApiError(xhr.response)
                    console.log(xhr.response);
                    jQuery("#loading").hide();
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    jQuery("#loading").hide();
                    if (xhr.status === 200) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);

            xhr.setRequestHeader('X-AUTH-TOKEN', localStorage.getItem('backOfficeAuthcode'));

            xhr.send(formData);
            jQuery("#loading").show();
        });
    }


    public createCibilReport(loanId,pan,formData:FormData):Observable<number> {
        return Observable.create(observer => {
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            let url=`${this.base}cibil/report/${loanId}/pan/${pan}`

            xhr.onload = (e)=> {
                if (xhr.readyState == 4 && xhr.status != 200) {
                    this.httpService.handlerApiError(xhr.response)
                    console.log(xhr.response);
                    jQuery("#loading").hide();
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    jQuery("#loading").hide();
                    if (xhr.status === 200) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);

            xhr.setRequestHeader('X-AUTH-TOKEN', localStorage.getItem('backOfficeAuthcode'));

            xhr.send(formData);
            jQuery("#loading").show();
        });
    }

    public deleteResultEntity(obj, resultId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.delete("https://staging-uat1.loanframe.com/back-office/api/loan/" + obj.loanId + "/verification/entity/" + obj.id + "/result/" + resultId, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public deleteBSALoanRecord( account,obj): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.httpService.delete(`${this.base}bank-statement/api/delete-record/loan/${account.loanId}/account/${account.accountUID}` , { headers: headers,body: jQuery.param(obj) })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }


    public downloadAllDocs(loanId, accountUID): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/summary-excel-download/loan/${loanId}/account/${accountUID}` , { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public verifyDoc(params, docId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            let url = '';
            if (docId == 'PAN') {
                url = this.baseUrl + 'getPanInformation';
            } else if (docId == 'Driving License') {
                url = this.baseUrl + 'getDriversLicInfo';
            } else if (docId == 'BSNL Bill') {
                url = this.baseUrl + 'getBsnlInformation';
            } else if (docId == 'Water Bill') {
                url = this.baseUrl + 'getWaterBillInfo';
            } else if (docId == 'LPG Bill') {
                url = this.baseUrl + 'getLPGInfo';
            } else if (docId == 'Aadhaar') {
                url = this.baseUrl + 'getAadhaarAuthentication';
            }
            headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("verificationAuthToken"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(url, JSON.stringify({ "custver": params }), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public verifyOrgDoc(params, docId): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            let url = '';
            if (docId == 'PAN') {
                url = this.baseUrl + 'getPanInformation';
            } else if (docId == 'Driving License') {
                url = this.baseUrl + 'getDriversLicInfo';
            } else if (docId == 'BSNL Bill') {
                url = this.baseUrl + 'getBsnlInformation';
            } else if (docId == 'Water Bill') {
                url = this.baseUrl + 'getWaterBillInfo';
            } else if (docId == 'LPG Bill') {
                url = this.baseUrl + 'getLPGInfo';
            } else if (docId == 'TIN') {
                url = this.baseUrl + 'getTinInfo';
            }
            headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("verificationAuthToken"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(url, JSON.stringify({ "custver": params }), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }
    public updateVerificationItemsOnResult(url, obj): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put(url, JSON.stringify(obj), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addTag(postData): Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`https://staging-uat1.loanframe.com/internal/bank-statement/api/add-tag`, JSON.stringify(postData), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public removeTag(postData): Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`https://staging-uat1.loanframe.com/internal/bank-statement/api/remove-tag`, JSON.stringify(postData), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public fetchAccountUID(daysAgo): Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/fetch-bank-accountUIDs?daysAgo=${daysAgo}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addUIDAccount(loanId, entityId, paramData): Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put(`${this.base}bank-statement/api/loan/${loanId}/entity/${entityId}/add-account-uid`, JSON.stringify(paramData), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public gstinVerification(postData, entityId): Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`https://staging-uat1.loanframe.com/back-office/evoke/gst-request/entity/${entityId}`, JSON.stringify(postData), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public fetchKeyWords(loanId, accountUID): Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/internal-keywords`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addInputTag(postData, loanId, accountUID): Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            //console.log(localStorage.getItem("backOfficeAuthcode"));
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/internal-keywords`, postData, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public addEntity(loanId, postData, isBackoffice):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            if(isBackoffice){
                headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            }else {
                headers.append('X-XSRF-TOKEN', sessionStorage.getItem("authcode"));
            }
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`/api/loan/${loanId}/entity`, postData, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public getEntitiesforLoan(loanId, isBackoffice):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            if(isBackoffice){
                headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            }else {
                headers.append('X-XSRF-TOKEN', sessionStorage.getItem("authcode"));
            }
            this.httpService.get(`/api/loan/${loanId}/entity`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public updateEntity(entityId, postData, isBackoffice):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            if(isBackoffice){
                headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            }else {
                headers.append('X-XSRF-TOKEN', sessionStorage.getItem("authcode"));
            }
            headers.append('Content-Type', 'application/json');
            this.httpService.put(`/api/entity/${entityId}`, postData, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public deleteEntity(entityId, isBackoffice):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            if(isBackoffice){
                headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            }else {
                headers.append('X-XSRF-TOKEN', sessionStorage.getItem("authcode"));
            }
            this.httpService.delete(`/api/entity/${entityId}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public deleteCibilData(loanId, pan):Promise<any>{
        return new Promise((resolve, reject)=>{
            var headers = new Headers();
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            console.log(pan, loanId)
            this.httpService.delete(`${this.base}cibil/${loanId}/pan/${pan}`, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public assignEntityToBs(loanId,accountUID, entityId, entityName):Promise<any>{
        return new Promise((resolve, reject) => {
            console.log(entityName);
            var headers = new Headers();
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.put(`${this.base}bank-statement/api/loan/${loanId}/account/${accountUID}/entity/${entityId}`, JSON.stringify(entityName), { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public manualSummaryOfTotals(postData):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`${this.base}bank-statement/api/add-summary-totals`, postData, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }

    public uploadVerificationImage(obj, data): Promise{
        return new Promise((resolve,reject)=>{
            var headers = new Headers();
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            //  headers.append('Content-Type', 'multipart/form-data');
            this.httpService.post("https://staging-uat1.loanframe.com/back-office/loan/" + obj.loanId + "/verification/" + obj.id + "/doc/" + obj.docId, data, {headers: headers})
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                );

        });
    }

    public getAllVerificationImage(obj): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("https://staging-uat1.loanframe.com/back-office/loan/" + obj.loanId + "/verification/" + obj.id + "/docs", {headers: headers/*, responseType: ResponseContentType.Blob*/})
                .map(res => res.json())
                .subscribe(data => {
                        console.log('data',data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    });

        });
    }

    public getVerificationImage(obj): Promise{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.get("https://staging-uat1.loanframe.com/back-office/loan/" + obj.loanId + "/verification/" + obj.id + "/doc/" + obj.name, {headers: headers, responseType: ResponseContentType.Blob})
                .map(res => res.blob())
                .subscribe(data => {
                        console.log('data',data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    });

        });
    }

    public deleteVerificationImage(obj): Promise {
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('X-XSRF-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            this.httpService.delete("https://staging-uat1.loanframe.com/back-office/loan/" + obj.loanId + "/verification/" + obj.id + "/doc/" + obj.docId, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                        console.log('data', data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err);
                    });
        });
    }

    public getBankAccSummary(loanId, postData):Promise<any>{
        return new Promise((resolve, reject) => {
            var headers = new Headers();
            headers.append('X-AUTH-TOKEN', localStorage.getItem("backOfficeAuthcode"));
            headers.append('Content-Type', 'application/json');
            this.httpService.post(`${this.conf.base}bank-statement/api/summary-bank/loan/${loanId}`, postData, { headers: headers })
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        resolve(data);
                    },
                    err => {
                        console.log(err);
                        reject(err)
                    }
                )
        })
    }
}