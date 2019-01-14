import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the IonRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRatingComponent {

  @Input() numStars: number = 5;
  @Input() value: number = 3;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = [];

  constructor() {
    this.calc();
  }

  calc(){
    this.stars = [];
    let tmp = this.value;
    for(let i=0; i<this.numStars; i++, tmp--){
      if(tmp >= 1){
        this.stars.push("star");
      } else {
        this.stars.push("star-outline");
      }
    }
  }

  starClicked(index){
    this.value = index + 1;
    this.ionClick.emit(this.value)
    this.calc();
  }

}
