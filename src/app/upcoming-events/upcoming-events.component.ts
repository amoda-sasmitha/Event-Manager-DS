import { Component, OnInit ,Input , SimpleChanges } from '@angular/core';

@Component({
  selector: 'upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  @Input('events') public upcoming_events;
  constructor() { }

  ngOnInit(): void {
    this.upcoming_events = this.upcoming_events.slice(0,5)
  }

  ngOnChanges(changes: SimpleChanges) {
  if ('upcoming_events' in changes) {
    if (changes.upcoming_events.currentValue) {
      this.upcoming_events = changes.upcoming_events.currentValue.slice(0,5);
    }
  }
  }

}
