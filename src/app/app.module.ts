import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventsComponent } from './events/events.component';
import { EventModalComponent } from './event-modal/event-modal.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    UpcomingEventsComponent,
    EventsComponent,
    EventModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
