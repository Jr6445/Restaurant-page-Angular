import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Leader } from '../share/leader';
import { LEADERS } from '../share/leaders';
import { baseURL}  from '../share/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return of().pipe(delay(2000));
  }

  getLeader(id:string): Observable<Leader>{
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000)); 
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));

  }


}
