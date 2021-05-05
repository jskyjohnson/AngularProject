import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagedata } from 'src/app/core/interfaces/imagedata';
import { Loremdata } from 'src/app/core/interfaces/loremdata';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogViewComponent } from 'src/app/components/dialog-view/dialog-view.component';
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-gallery-dash',
  templateUrl: './gallery-dash.component.html',
  styleUrls: ['./gallery-dash.component.scss'],
})
export class GalleryDashComponent implements OnInit {
  datalist: Loremdata[] | undefined;
  filterlist: Loremdata[] = [];
  imagelist: Imagedata[] = [];
  filter: string | undefined;

  sidebar: boolean = false;

  currentImage: Imagedata | undefined;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public scroll: ScrollDispatcher
  ) {}

  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.apiService.getList().subscribe((data: any) => (this.datalist = data));
  }

  //Returns a unique author list
  getAuthorList(data: Loremdata[] | undefined): string[] {
    if (!data) return [];
    return data
      .map((v: any) => v.author)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a: Loremdata, b: Loremdata) => (a.author < b.author ? 1 : 0));
  }

  searchEventHandler($event: any) {
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
      });
    });
    this.imagelist = newImages;
    this.openSide();
  }

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
        max: this.imagelist.length -1,
      },
      panelClass: 'full-width-dialog',
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
      // Scroll to current image...
    });
  }

  dialogNextImage(dialog: any) {
    if (this.currentImage) {
      let indx = this.imagelist.indexOf(this.currentImage);
      if (indx < this.imagelist.length - 1) {
        this.currentImage = this.imagelist[indx + 1];
        dialog.componentInstance.data.image = this.currentImage;
        dialog.componentInstance.data.index = indx +1;
      }
    }
  }

  dialogPrevImage(dialog: any) {
    if (this.currentImage) {
      let indx = this.imagelist.indexOf(this.currentImage);
      if (indx > 0) {
        this.currentImage = this.imagelist[indx - 1];
        dialog.componentInstance.data.image = this.currentImage;
        dialog.componentInstance.data.index = indx -1;
      }
    }
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
}
