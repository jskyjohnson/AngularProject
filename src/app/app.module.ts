import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { InfoComponent } from './pages/info/info.component';
import { GalleryDashComponent } from './containers/gallery-dash/gallery-dash.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryViewComponent } from './components/gallery-view/gallery-view.component';
import { MaterialModule } from './material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogViewComponent } from './components/dialog-view/dialog-view.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    InfoComponent,
    GalleryDashComponent,
    SearchComponent,
    GalleryViewComponent,
    DialogViewComponent,
  ],
  entryComponents: [DialogViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
