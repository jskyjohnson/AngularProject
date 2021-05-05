import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { GaryDashComponent } from './containers/gallery-dash/gallery-dash.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  // { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: '', component: GalleryComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
