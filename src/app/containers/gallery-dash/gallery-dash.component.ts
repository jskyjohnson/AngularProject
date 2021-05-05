import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagedata } from 'src/app/core/interfaces/imagedata';
import { Loremdata } from 'src/app/core/interfaces/loremdata';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogViewComponent } from 'src/app/components/dialog-view/dialog-view.component';

@Component({
  selector: 'app-gallery-dash',
  templateUrl: './gallery-dash.component.html',
  styleUrls: ['./gallery-dash.component.scss'],
})
export class GalleryDashComponent implements OnInit {
  //Data
  datalist: Loremdata[] | undefined;
  filterlist: Loremdata[] = [];
  imagelist: Imagedata[] = [];
  filter: string | undefined;

  //UI Control
  sidebar: boolean = false;
  currentImage: Imagedata | undefined;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getList().subscribe((data: any) => (this.datalist = data));
  }

  //Data functions
  searchEventHandler() {
    this.imagelist = this.populateImages(this.filterlist);
    this.openSide();
  }

  filterEventHandler($event: any) {
    this.filter = $event;
    this.updateFilterList();
  }

  updateFilterList() {
    if (this.datalist) {
      this.filterlist = this.datalist.filter(
        (v: Loremdata) =>
          v.author.toLowerCase().includes(this.filter!.toLowerCase()) //Sort by Lowercase to ignore input errors
      );
    }
  }

  //UI Functions
  openSide() {
    this.sidebar = true;
  }

  backdropClick() {
    this.sidebar = false;
  }

  dialogEvent(item: Imagedata) {
    this.currentImage = item;
    let diag = this.dialog.open(DialogViewComponent, {
      data: {
        image: item,
        index: this.imagelist.indexOf(this.currentImage),
        max: this.imagelist.length - 1,
      },
      panelClass: 'full-width-dialog',
      backdropClass: 'dialog-backdrop',
    });

    const nextSub = diag.componentInstance.nextEvent.subscribe(() => {
      this.dialogNextImage(diag);
    });

    const prevSub = diag.componentInstance.prevEvent.subscribe(() => {
      this.dialogPrevImage(diag);
    });

    diag.afterClosed().subscribe(() => {
      nextSub.unsubscribe();
      prevSub.unsubscribe();
    });
  }

  dialogNextImage(dialog: any) {
    if (this.currentImage) {
      let indx = this.imagelist.indexOf(this.currentImage);
      if (indx < this.imagelist.length - 1) {
        this.currentImage = this.imagelist[indx + 1];
        dialog.componentInstance.data.image = this.currentImage;
        dialog.componentInstance.data.index = indx + 1;
      }
    }
  }

  dialogPrevImage(dialog: any) {
    if (this.currentImage) {
      let indx = this.imagelist.indexOf(this.currentImage);
      if (indx > 0) {
        this.currentImage = this.imagelist[indx - 1];
        dialog.componentInstance.data.image = this.currentImage;
        dialog.componentInstance.data.index = indx - 1;
      }
    }
  }

  //Helper Functions
  getAuthorList(data: Loremdata[] | undefined): string[] {
    if (!data) return [];
    return data
      .map((v: any) => v.author)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a: Loremdata, b: Loremdata) => (a.author < b.author ? 1 : 0));
  }

  populateImages(filterlist: Loremdata[]): Imagedata[] {
    let smaller = 600;
    let newImages: Imagedata[] = [];
    this.filterlist.forEach((v) => {
      let ratio = v.height / v.width;
      newImages.push({
        original_width: v.width,
        original_height: v.height,
        gallery_width: smaller,
        gallery_height: Math.floor(ratio * smaller),
        ratio: ratio,
        id: v.id,
        author: v.author,
        author_url: v.author_url,
        column: 0,
      });
    });

    newImages = this.calculateColumnPosition(newImages);
    return newImages;
  }

  calculateColumnPosition(imagelist: Imagedata[]): Imagedata[] {
    let leftColumn = 0;
    let rightColumn = 0;
    imagelist.map((v, i, a) => {
      if (leftColumn < rightColumn) {
        v.column = 0;
        leftColumn += v.gallery_height;
      } else {
        v.column = 1;
        rightColumn += v.gallery_height;
      }
    });

    return imagelist;
  }
}
