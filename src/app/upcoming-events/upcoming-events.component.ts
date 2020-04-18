import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {

  @Input('events') public upcoming_events;
  constructor() { }

  ngOnInit(): void {
  }

}
