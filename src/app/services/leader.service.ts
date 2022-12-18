import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Leader } from '../share/leader';
import { LEADERS } from '../share/leaders';
import { baseURL}  from '../share/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id:string): Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader | any>(baseURL+'leadership?featured=true')
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }


}
