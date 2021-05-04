import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Imagedata } from 'src/app/core/interfaces/imagedata';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent {
  @Input() imagelist: Imagedata[] = [];

  @Output() imageClickHandler = new EventEmitter<Imagedata>();

  imageClicked(item: Imagedata) {
    this.imageClickHandler.emit(item);
  }
}
