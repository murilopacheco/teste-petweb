import { Component, OnInit } from '@angular/core';
import {Pet} from "../../dto/pet";
import {PetService} from "../pet.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {DataUtils} from "../../utils/datas";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  constructor(private petService: PetService,
              private location: Location,
              private router: Router) { }

  displayedColumns: string[] = ['id', 'nome', 'nascimento','especie','porte', 'idade', 'acoes'];

  applyFilter(filtro: string) {
    const filterValue = filtro;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtro = '';
  dataSource!: any;
  pet: Pet = new Pet();
  pets: Pet[] = [];
  formatadorDatas: DataUtils = new DataUtils();

  ngOnInit(): void {
    this.petService.listarPets().subscribe(dados => {
      this.pets = dados;
      this.dataSource =  new MatTableDataSource(this.pets);
      this.calcularIdade(this.pets);
    });

  }

  delete(pet: Pet){
    this.petService.deletarPet(pet.id).subscribe((dados) => {
      this.petService.showMessage('Pet excluido com sucesso!', false);
      this.pets.push(dados);
      this.dataSource = this.pets;
      location.reload();
    });
  }

  editarPet(pet: Pet): void {
    this.router.navigate(['/pet-detalhe', pet.id]);
  }

  novoPet(): void {
    this.router.navigate(['/pet-detalhe']);
  }

  ativarInativarPet(pet: Pet){
    if(pet.ativo){
      pet.ativo = false;
    }else{
      pet.ativo = true;
    }
    this.petService.editarPet(pet).subscribe((dados) => {
      this.petService.showMessage('Pet inativo!', false);
      this.pets.push(dados);
      this.dataSource = this.pets;
      location.reload();
    });
  }

  calcularIdade(pets: Pet[]){
    for (let i = 0; i < pets.length; i++){
      pets[i].idade = this.formatadorDatas.dateDiff(pets[i].dataNascimento, new Date());
    }
  }
}
