import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../share/dish';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';
import { Comment } from "../share/comment";
import {MatSliderModule} from '@angular/material/slider';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
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

    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);});

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
    let today = new Date().toISOString();
    this.comment.date = today;
    this.dishcopy.comments.push(this.comment);
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
