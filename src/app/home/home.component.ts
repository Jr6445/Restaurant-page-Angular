import { Component, Inject, OnInit } from '@angular/core';
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

  dish:Dish;
  promotion:Promotion;
  leader:Leader;

  constructor(private dishService: DishService, 
    private promotioService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL:any) {

   }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe((dish) => this.dish = dish);

    this.promotioService.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader);
  }

}
