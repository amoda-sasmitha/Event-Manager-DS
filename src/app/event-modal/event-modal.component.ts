import { Component, OnInit  , Input , SimpleChanges , ViewChild , Output , EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css'],
})
export class EventModalComponent implements OnInit {

  closeResult = '';
  @Input('show') public show:boolean;
  @ViewChild('content') private content;
  @Output() public dismiss = new EventEmitter();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
      this.dismiss.emit(); 
    }, reason => {
      console.log(reason);
      this.dismiss.emit(); 
    });
  }

  ngOnChanges(changes: SimpleChanges) {
       console.log(changes.show.currentValue);
      if(changes.show.currentValue){
        this.open(this.content)
      }
  }

 

}
