import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { Imagedata } from 'src/app/core/interfaces/imagedata';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss'],
})
export class DialogViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { image: Imagedata; index: number; max: number }
  ) {}

  prevEvent = new EventEmitter();
  nextEvent = new EventEmitter();

  ngOnInit(): void {}

  prev(): void {
    console.log('Previous clicked!');
    this.prevEvent.emit('Previous');
  }

  next(): void {
    console.log('Next clicked!');
    this.nextEvent.emit('Next');
  }
}
