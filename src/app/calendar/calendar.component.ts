import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
 
  dates = [];
  currentMonth
  currentYear
  currentDate

  @Input('event-counts') public event_counts;
  @Output() change = new EventEmitter();

  constructor(private datePipe :DatePipe ) {
       this.currentDate = new Date();
       this.currentDate.setHours(0,0,0,0);
       this.currentYear = this.currentDate.getFullYear();
       this.currentMonth = this.currentDate.getMonth();
 
   }

  ngOnInit(): void {
    this.showCalander(this.currentYear  , this.currentMonth );
    console.log(this.dates);
  }

  changeDate(item){
    this.change.emit(item);
  }

  getSunday(d) {
    var day = d.getDay(),
    diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }

  showCalander(year , month ){
    let firstdate =  new Date( year ,month , 1);
    let lastdate =  new Date(year ,month + 1 , 0);
    let firstSunday = this.getSunday(firstdate);
    this.dates = [];
    let newdates = [];

    for(var arr=[],dt=firstSunday ; dt<=lastdate; dt.setDate(dt.getDate()+1)){ 
    
      newdates.push( new Date(dt) );
    }

    newdates.forEach( date => {
      this.dates.push({
        date : date ,
        count : typeof this.event_counts[date] === "undefined" ? 0 : this.event_counts[date]
      })
    })


  }

next() {
     this.currentYear = (this.currentMonth === 11) ? this.currentYear  + 1 : this.currentYear;
     console.log(this.currentYear);
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalander(this.currentYear ,this.currentMonth );
}

previous() {
  this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
  console.log(this.currentYear);
  this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
  this.showCalander(this.currentYear ,this.currentMonth );
}

}
