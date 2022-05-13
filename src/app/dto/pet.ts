import {Porte} from "../enums/enumPorte";

export class Pet {
  id!: number;
  nome!: string;
  dataNascimento!: Date;
  especie!: string;
  porte!: Porte;
  ativo!: boolean;
  idade!: string;
}
