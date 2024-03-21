import {animate, state,style,transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Scholarships } from '../../models/scholarhips';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade',[
      state('void',style({opacity: 0})),
      transition('void <=> *',[animate('1s')]),
  ])
]
})

export class SliderComponent implements OnInit {
@Input() items: Scholarships[] = [];
@Input() isBanner: boolean = false;
currentSlideIndex : number = 0;


  ngOnInit(): void {
    if(!this.isBanner){
      setInterval(()=>{
        this.currentSlideIndex= ++this.currentSlideIndex % this.items.length;
      }, 3000);
    }
    
  }

}
