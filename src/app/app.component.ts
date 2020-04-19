import { Component ,  OnInit} from '@angular/core';
import { data } from './sample-data'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //Added some sample date to display purpose
  public events = data;
  public currentDate: Date = new Date();
  public show_event_modal : boolean = false;
 
  constructor() { 
    this.currentDate.setHours(0,0,0,0);
  }

  //test
  ngOnInit(): void {
    this.FilterandSortDateArray()
  }
 
  //Filter events by dates 
  FilterEventsByDate(){
    return this.events.filter ( event => event.date.getTime() === this.currentDate.getTime() );
  }

  //function trigged when calender day clicked
  OnCalendarDateClicked(date:Date){
    this.currentDate = date;
    this.FilterandSortDateArray()
  }

  //add event model toggle function
  OnClickAddEvent(){
    this.show_event_modal = true;
  }

  //add event model toggle function
  DismissEventModal(){
    this.show_event_modal = false;
  }

  //New Event Add to the Array
  //Filter and Sort array according to the new event
  AddNewEvent(Event){
    console.log(Event);
    this.events.push(Event);
    this.FilterandSortDateArray()
  }

  //Delete Event from array
  //Filter and Sort array according to the new changes
  DeleteEvent(Event){
    this.events = this.events.filter( item => item.id !== Event.id );
    this.FilterandSortDateArray();
  }

  //Update Event from array
  //Filter and Sort array according to the new changes
  UpdateEvent(event){
    console.log("App" , event);
    this.events = this.events.filter( item => item.id !== event.id );
    this.events.push(event);
    this.FilterandSortDateArray();
  }

  //function used to remove/ filter ended events and sort them according to 
  //end time of the event
  FilterandSortDateArray(){
    let now = Date.now()

    this.events = this.events.filter( item => {
       return item.end_time.getTime() > now
    })

    this.events.sort(function(a,b){
      return a.start_time.getTime() - b.start_time.getTime() ;
    });

    console.log(this.events);
  }
  
 //get count of events per day used to display event count in calendar component
  CountEventsByDates(events){
    return events.reduce((acc, it) => {
      acc[it.date] = acc[it.date] + 1 || 1;
      return acc;
    }, {});   
  }
}

