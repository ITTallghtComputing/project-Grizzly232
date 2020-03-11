import { Injectable } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  months: String[] = ["January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"];
  days: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"];

  constructor() { }

  convertToOutDate(date: Date) {
    let out = "";
    let tempDate = date.getDate().toString();
    switch(tempDate) {
      case("1"):
        tempDate += "st";
        break;
      case("2"):
        tempDate += "nd";
        break;
      case("3"):
        tempDate += "rd";
        break;
      default:
        tempDate += "th"
    }
    out += this.days[date.getDay()] + ", " + tempDate + " of " + this.months[date.getMonth()] + ", " + date.getFullYear();
    return out;
  }
}
