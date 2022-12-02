import { Component, OnInit } from '@angular/core';
import { Dish } from '../share/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../share/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish | undefined;
  promotion:Promotion | undefined;
  leader:Leader | undefined;

  constructor(private dishService: DishService, 
    private promotioService:PromotionService,
    private leaderService:LeaderService) {

   }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotioService.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
  }

}
