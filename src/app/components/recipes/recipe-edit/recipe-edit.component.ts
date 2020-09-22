import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  subscriber: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriber = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('editMode', this.editMode);
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
