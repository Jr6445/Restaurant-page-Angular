import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../share/dish';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';
import { Comment } from "../share/comment";
import {MatSliderModule} from '@angular/material/slider';
import { expand, flyInOut, visibility } from '../animations/app.animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ]),visibility(),
    flyInOut(), expand()
  ], 
})


export class DishdetailComponent implements OnInit {

  dish: any;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  dishcopy: Dish;
  @ViewChild('cform') commentFormDirective: any;
  visibility = 'shown';


  formErrors = {
    'author': '',
    'comment': '',
    'rating': ''
 };

 validationMessages = {
  'author': {
    'required': 'Author name is required',
    'minlength': 'Author name must be at least 2 characters long'

  },
  'comment': {
    'required': 'Comment is required',
    'minlength': 'Comment must be at least 2 characters long'
  },
  'rating': {
    'required': 'Push stars'
  }
};

  constructor(private dishService:DishService, 
    private route:ActivatedRoute,
    private location:Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL:any) {
      this.createForm();
     }

     

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.dishService.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);

/*     this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy= dish; this.setPrevNext(dish.id);},
      errmess => this.errMess= <any>errmess); */

      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
      
    //this.dishService.getDish(id)
    //.subscribe((dish) => this.dish = dish);
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required, Validators.minLength(2)]],
      rating: '5'
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {

    let field: keyof typeof this.formErrors;

    if (!this.commentForm) { return; }
    const form = this.commentForm;

    for (field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key as keyof typeof messages] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null;  this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

}
