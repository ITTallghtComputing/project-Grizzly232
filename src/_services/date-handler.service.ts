import { Injectable } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


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

  convertToRouteDate(date: Date) : string {
    let route = "";
    route += date.getFullYear() + "-";
    let month = date.getMonth();
    if(month < 9)
      route += "0"
    route += (date.getMonth() + 1) + "-";
    route += date.getDate();
    return route;
  }

  convertToFirebaseDate(date: string) : firestore.Timestamp {
    // not actually concerned with hours, minutes or seconds, but the date
    // constructs by default to '01:00:00' which breaks the comparison later
    date += "T00:00:00";
    return firestore.Timestamp.fromDate(new Date(date));
  }
}
