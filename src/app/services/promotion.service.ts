import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';
import { baseURL}  from '../share/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
 
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion | any>(baseURL+'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
