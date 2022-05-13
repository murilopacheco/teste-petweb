export class DataUtils {


  calculaIdade(dataNasc: Date) {
    var dataAtual = new Date();
    var dataString = this.dataFormatada(dataNasc);
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataString.split('/');
    var diaNasc = anoNascParts[0];
    var mesNasc = anoNascParts[1];
    var anoNasc = anoNascParts[2];
    var idade = anoAtual - parseInt(anoNasc);
    var mesAtual = dataAtual.getMonth() + 1;
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;
    if (mesAtual < parseInt(mesNasc)) {
      idade--;
    } else {
      //Se estiver no mes do nascimento, verificar o dia
      if (mesAtual == parseInt(mesNasc)) {
        if (new Date().getDate() < parseInt(diaNasc)) {
          //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
          idade--;
        }
      }
    }
    return idade;
  }

  dataFormatada(data: Date) {
    var dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  dateDiff(startingDate: Date, endingDate: any) {
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    return yearDiff + 'Anos ' + monthDiff + 'Meses ' + dayDiff + 'Dias';
  }
}
