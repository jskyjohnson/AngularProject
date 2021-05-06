import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { Imagedata } from 'src/app/core/interfaces/imagedata';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss'],
  animations: [
    trigger('changeState', [
      state(
        'start',
        style({
          opacity: '0',
        })
      ),
      state('done', style({ opacity: '1' })),
      transition('* => start', [style({ opacity: 0 }), animate(300)]),
      transition('start => *', animate(300, style({ opacity: 1 }))),
    ]),
  ],
})
export class DialogViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { image: Imagedata; index: number; max: number }
  ) {}

  prevEvent = new EventEmitter();
  nextEvent = new EventEmitter();

  animationState: string = 'done';

  ngOnInit(): void {}

  prev(): void {
    this.animationState = 'start';
    this.prevEvent.emit('Previous');
  }

  next(): void {
    this.animationState = 'start';

    this.nextEvent.emit('Next');
  }

  logAnimation($event: any): void {
    console.log($event);
  }
}
