import { Injectable } from '@angular/core';
import { Swim } from '../app/swim/swim.component';

@Injectable({
  providedIn: 'root'
})
export class SwimBinderService {

  swimData: any;
  constructor() { }

  setSwimData(swimData) {
    this.swimData = swimData;
  }

  getSwimData() {
    return this.swimData;
  }
}
