import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return new Promise(resolve => {
      //simulate server latency
      setTimeout  (() => resolve(DISHES), 2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      //simulate server latency
      setTimeout  (() => resolve(Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0])), 2000);
    }); 
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      //simulate server latency
      setTimeout  (() => resolve(Promise.resolve(DISHES.filter((dish) => dish.featured)[0])), 2000);
    }); 
  }
  
}
