import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Pet} from "../dto/pet";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private httpCliente: HttpClient,
              private snackbar: MatSnackBar) { }

  listarPets(): Observable<Pet[]>{
    const url = `${environment.config.URL_API}/pet`;
    return this.httpCliente.get<Pet[]>(url).pipe(
      map((pets) => pets)
    );
  }

  salvarPet(pet: Pet): Observable<Pet>{
    const url = `${environment.config.URL_API}/pet/add` ;
    return this.httpCliente.post<Pet>(url, pet).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  editarPet(pet: Pet): Observable<Pet>{
    const url = `${environment.config.URL_API}/pet/edit` ;
    return this.httpCliente.put<Pet>(url, pet).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  deletarPet(id: number): Observable<Pet>{
    const url = `${environment.config.URL_API}/pet/delete/` + id;
    return this.httpCliente.delete<Pet>(url).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  bucarPetPorId(id: number): Observable<Pet> {
    const url = `${environment.config.URL_API}/pet/find/` ;
    return this.httpCliente.get<Pet>(url + id).pipe(
      map((pet) => pet),
      catchError( (e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    console.log(e.error.mensagem);
    this.showMessage(e.error.mensagem, true );
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}
