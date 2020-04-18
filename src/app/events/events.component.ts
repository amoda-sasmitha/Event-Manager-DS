import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers : [DatePipe]
})
export class EventsComponent implements OnInit {

  @Input('events') public events;
  @Input('currentDate') public currentDate;
  @Output() addEvent = new EventEmitter();

  constructor(private datePipe : DatePipe) { }

  ngOnInit(): void {
  }

  onClickAddEvent(){
    this.addEvent.emit();
  }

}
