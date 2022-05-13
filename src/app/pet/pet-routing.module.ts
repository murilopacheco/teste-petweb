import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PetListComponent} from "./pet-list/pet-list.component";
import {PetDetalheComponent} from "./pet-detalhe/pet-detalhe.component";

const routes: Routes = [
  {path: 'pet', component: PetListComponent},
  {path: 'pet-detalhe', component: PetDetalheComponent},
  {path: 'pet-detalhe/:id', component: PetDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule { }
