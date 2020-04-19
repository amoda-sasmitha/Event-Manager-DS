import { Component, OnInit  , Input , SimpleChanges , ViewChild , Output , EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { iif } from 'rxjs';

@Component({
  selector: 'event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
})
export class EventModalComponent implements OnInit {

  public title : string = "";
  public description : string = "";
  public starttime = {hour: 12, minute: 0};
  public endtime = {hour: 12, minute: 0};

  public errors = { title : "" , description : "" , time : "" }
 
  @Input() public show:boolean;
  @Input() public currentDate:Date;
  @ViewChild('content') private content;
  @Output() public dismiss = new EventEmitter();
  @Output() addEvent = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  open(content) {
    this.modalService.open(content , { size: 'lg' }).result.then((result) => {
      this.dismiss.emit(); 
    }, reason => {
      this.dismiss.emit(); 
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

    if( this.endtime.hour < this.starttime.hour ){
      count++;
      this.errors.time = "End Time must be less than start time"
    }else if(this.endtime.hour == this.starttime.hour && this.endtime.minute < this.starttime.minute   ){
      count++;
      this.errors.time = "End Time must be less than start time"
    }else{
      this.errors.time = ""
    }

    if(count == 0){
      let startTime = new Date(this.currentDate);
      let endtTime = new Date(this.currentDate);

      let event = {
        id : Date.now(),
        date :  this.currentDate,
        title : this.title,
        description : this.description,
        start_time : new Date(startTime.setHours( this.starttime.hour , this.starttime.minute , 0 ,0 )),
        end_time : new Date(endtTime.setHours( this.endtime.hour , this.endtime.minute , 0 ,0 )),
      } 
      this.addEvent.emit(event);
      this.title =""
      this.description =""
      this.starttime = {hour: 12, minute: 0};
      this.endtime = {hour: 12, minute: 0};
      this.modalService.dismissAll();
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    
    if ('show' in changes) {
      if (changes.show.currentValue) {
        this.show = changes.show.currentValue;
        this.open(this.content)
      }
    }

    if ('currentDate' in changes) {
      if (changes.currentDate.currentValue) {
        this.currentDate = changes.currentDate.currentValue;
      }
    }

  }

 

}
