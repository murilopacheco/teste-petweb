import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PetListComponent} from "./pet/pet-list/pet-list.component";

const appRouts: Routes = [
  { path: '', component: PetListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
