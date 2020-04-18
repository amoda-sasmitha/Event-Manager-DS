import { Component ,  OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   public events = [
    {
      date :  new Date('2020-04-01 00:00:00') ,
      title : "Angular Assignment",
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
      start_time : "10:30:00",
      end_time : "12:00:00",
    },
    {
     date :  new Date('2020-04-03 00:00:00') ,
     title : "CV Upload to Courseweb",
     description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
     start_time : "14:30:00",
     end_time : "14:45:00",
   },
   {
    date :  new Date('2020-04-03 00:00:00') ,
    title : "CV Upload to Courseweb",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
    start_time : "15:00:00",
    end_time : "15:20:00",
  },
  {
    date :  new Date('2020-04-03 00:00:00') ,
    title : "CV Upload to Courseweb",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum augue ut lorem suscipit luctus.",
    start_time : "15:30:00",
    end_time : "15:40:00",
  },
  ];

  ngOnInit(): void {

  }
  
  

  CountEventsByDates(events){
    return events.reduce((acc, it) => {
      acc[it.date] = acc[it.date] + 1 || 1;
      return acc;
    }, {});   
  }
}

