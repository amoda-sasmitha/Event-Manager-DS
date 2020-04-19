import { Component, OnInit , Input , Output , ViewChild , EventEmitter , SimpleChanges} from '@angular/core';
import { DatePipe } from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  @ViewChild('content') private content;
  @ViewChild('updatecontent') private updatecontent;

  public today:Date = new Date();
  public deleteitem : any;
 
  //edit form inputs
  public updateId : number  = 0 ;
  public updateDate : Date = new Date();
  public title : string = "";
  public description : string = "";
  public start_time = {hour: 12, minute: 0};
  public end_time = {hour: 12, minute: 0};
  public errors = { title : "" , description : "" , time : "" }

  constructor(private datePipe : DatePipe ,
    private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.today.setHours(0,0,0,0);
  }

  onClickAddEvent(){
    this.addEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('events' in changes) {
      if (changes.events.currentValue) {
        this.events = changes.events.currentValue;
      }
    }
    }

    onClickDelete(event){
      this.deleteitem = event;
      this.modalService.open(this.content ,
         { size: 'md' }).result.then((result) => {
          if(result == 1){
            this.deleteEvent.emit(event)
          }
      }, reason => {
        console.log(reason);
      });
    }

    onClickUpdate(event){
 
      this.updateId = event.id;
      this.updateDate = event.date;
      this.title = event.title;
      this.description = event.description;
      this.start_time.hour = event.start_time.getHours();
      this.start_time.minute = event.start_time.getMinutes();
      this.end_time.hour = event.end_time.getHours();
      this.end_time.minute = event.end_time.getMinutes();

      this.modalService.open(this.updatecontent ,
        { size: 'lg' }).result.then((result) => {
          
     }, reason => {
       console.log(reason);
     });
    }

    validate(){
     
      let count:number = 0;
      if(this.title.length == 0 ){
        count++;
        this.errors.title = "Title is required"
      }else{
        this.errors.title = ""
      }
  
      if(this.description.length == 0 ){
        count++;
        this.errors.description = "Description is required"
      }else{
        this.errors.description = ""
      }
  
      if( this.end_time.hour < this.start_time.hour ){
        count++;
        this.errors.time = "End Time must be less than start time"
      }else if(this.end_time.hour == this.start_time.hour && this.end_time.minute < this.start_time.minute   ){
        count++;
        this.errors.time = "End Time must be less than start time"
      }else{
        this.errors.time = ""
      }
  
      if(count == 0){
        let startTime = new Date(this.updateDate);
        let endtTime = new Date(this.updateDate);
  
        let event = {
          id : this.updateId,
          date :  this.currentDate,
          title : this.title,
          description : this.description,
          start_time : new Date(startTime.setHours( this.start_time.hour , this.start_time.minute , 0 ,0 )),
          end_time : new Date(endtTime.setHours( this.end_time.hour , this.end_time.minute , 0 ,0 )),
        } 

        console.log(event);
        this.updateEvent.emit(event);
        this.title =""
        this.description =""
        this.start_time = {hour: 12, minute: 0};
        this.end_time = {hour: 12, minute: 0};
        this.modalService.dismissAll();
      }
  
    }

}
