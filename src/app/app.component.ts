import { Component ,  OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   public events = [
    {
      id : 1001,
      date :  new Date('2020-04-25 00:00:00') ,
      title : "Angular Assignment",
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
      start_time : new Date('2020-04-25 12:00:00'),
      end_time : new Date('2020-04-25 13:50:00'),
    },
    {
     id : 1002,
     date :  new Date('2020-04-30 00:00:00') ,
     title : "CV Upload to Courseweb",
     description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
     start_time : new Date('2020-04-30 14:00:00'),
     end_time : new Date('2020-04-30 14:40:00'),
   },
   {
    id : 1003,
    date :  new Date('2020-04-22 00:00:00') ,
    title : "CV Upload to Courseweb",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
    start_time : new Date('2020-04-22 04:00:00'),
    end_time : new Date('2020-04-22 05:00:00'),
  },
  {
    id : 1004,
    date :  new Date('2020-04-22 00:00:00') ,
    title : "CV Upload to Courseweb",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
    start_time : new Date('2020-04-22 13:00:00'),
    end_time : new Date('2020-04-22 14:00:00'),
  },
  ];
  public currentDate: Date = new Date();
  public show_event_modal : boolean = false;
 
  constructor() { 
    this.currentDate.setHours(0,0,0,0);
  }

  ngOnInit(): void {
    this.FilterandSortDateArray()
  }

  FilterEventsByDate(){
    return this.events.filter ( event => event.date.getTime() === this.currentDate.getTime() );
  }

  OnCalendarDateClicked(date:Date){
    this.currentDate = date;
    this.FilterandSortDateArray()
  }

  OnClickAddEvent(){
    this.show_event_modal = true;
  }

  DismissEventModal(){
    this.show_event_modal = false;
  }

  AddNewEvent(Event){
    console.log(Event);
    this.events.push(Event);
    this.FilterandSortDateArray()
  }

  DeleteEvent(Event){
    this.events = this.events.filter( item => item.id !== Event.id );
    this.FilterandSortDateArray();
  }

  UpdateEvent(event){
    console.log("App" , event);
    this.events = this.events.filter( item => item.id !== event.id );
    this.events.push(event);
    this.FilterandSortDateArray();
  }

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
  

  CountEventsByDates(events){
    return events.reduce((acc, it) => {
      acc[it.date] = acc[it.date] + 1 || 1;
      return acc;
    }, {});   
  }
}

