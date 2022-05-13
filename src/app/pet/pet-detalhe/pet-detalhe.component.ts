import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PetService} from "../pet.service";
import {Pet} from "../../dto/pet";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {Subscription} from "rxjs";
import {Porte} from "../../enums/enumPorte";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pet-detalhe',
  templateUrl: './pet-detalhe.component.html',
  styleUrls: ['./pet-detalhe.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class PetDetalheComponent implements OnInit {

  constructor(private petService: PetService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,) { }

  pet: Pet = new Pet();
  form: FormGroup = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    especie: new FormControl(),
    porte: new FormControl(),
    dataNascimento: new FormControl()
  });

  matcher = new MyErrorStateMatcher();

  inscricao!: Subscription;

  availableOptions = [Porte.PEQUENO, Porte.MEDIO, Porte.GRANDE];
  selected = "";

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.petService.bucarPetPorId(id).subscribe(dados => {
            this.pet = dados;
            this.selected = this.pet.porte.toString();
            this.form = this.fb.group({     // {5}
              id: [this.pet.id],
              nome: [this.pet.nome, [Validators.required, Validators.minLength(3)]],
              especie: [this.pet.especie, Validators.required],
              porte: [this.pet.porte, [Validators.required]],
              dataNascimento: [this.pet.dataNascimento]
            });
            console.log(this.pet);
          }, error => {console.error(error); });
        } else {
          this.pet = new Pet();
          this.form = this.fb.group({     // {5}
            id: [this.pet.id],
            nome: [this.pet.nome, [Validators.required, Validators.minLength(3)]],
            especie: [this.pet.especie, Validators.required],
            porte: [this.pet.porte, [Validators.required]],
            dataNascimento: [this.pet.dataNascimento]
          });
        }
      });
  }
  onSubmit(): void {
    this.pet = this.form.value;
    this.setarPorte();
    if (this.pet.id === null){
      this.petService.salvarPet(this.pet).subscribe(() => {
        this.petService.showMessage('Animal salvo com sucesso', false);
      });
      this.router.navigate(['/pet']);
    }else{
      this.petService.editarPet(this.pet).subscribe(() => {
        this.petService.showMessage('Animal salvo com sucesso', false);
      });
      this.router.navigate(['/pet']);
    }
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return false;
  }

  get getControl(){
    return this.form.controls;
  }

  getOptionLabel(porte: Porte) {
    switch (porte) {
      case Porte.PEQUENO:
        return "Porte - Pequeno";
      case Porte.MEDIO:
        return "Porte - Médio";
        case Porte.GRANDE:
        return "Porte - Grande";
      default:
        throw new Error("Unsupported option");
    }
  }

  setarPorte(){
    if(this.selected === 'PEQUENO'){
      this.pet.porte = Porte.PEQUENO;
    }else if(this.selected === 'MEDIO'){
      this.pet.porte = Porte.MEDIO;
    }else if(this.selected === 'GRANDE'){
      this.pet.porte = Porte.GRANDE;
    }
  }

}
