import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  constructor() { }
  months: ["January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"];
  days: ["Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday", "Sunday"];

  convertToOutDate(date) {
    let out;
    console.log(date);
    out += date.getFullYear();
    out += date.getMonth();
    out += date.getDay()
    console.log(out);
    return out;
  }
}
