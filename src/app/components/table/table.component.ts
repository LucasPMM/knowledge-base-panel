import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public hasActions: boolean = false;
  public hasChangeAction: boolean = false;
  public statusList: string[] = [];

  public columns = [
    'nome',
    'e-mail',
    'telefone',
  ];

  public actions = [
    'detail',
    'changeStatus'
  ];

  public data = [
    ['Lucas Paulo Martins Mariz', 'lucaspaulom@hotmail.com', '(31) 9 7502-7868', 'activated'],
    ['Sander Adriano Mariz', 'sandermariz@hotmail.com', '(31) 9 8402-4973', 'disabled'],
    ['Cláudiamaris Martins Mariz', 'lucaspaulom@hotmail.com', '(31) 9 3496-0550', 'activated'],
  ];

  constructor() { }

  private changeStatusEffects() {
    if (this.hasChangeAction) {
      for (let i = 0; i < this.data.length; i++) {
        this.statusList.push((this.data[i][this.data[i].length - 1]));
        this.data[i].splice(this.data[i].length - 1, 1);
      }
      console.log('this.statusList', this.statusList);
      console.log('this.data', this.data);
    }
  }

  private tableHasActions() {
    this.hasActions = this.actions.length ? true : false;
    this.hasChangeAction = this.actions.includes('changeStatus');
    this.changeStatusEffects();
    console.log('hasActions', this.hasActions);
  }

  ngOnInit() {
    this.tableHasActions();
  }

}


// Objeto com as colunas (ngFor para determinar o numero das colunas)
// Dados para preencher a tabela
// Quais botões deve ter na ultima coluna (pode não ter botão também)

// Output para quando o botão de action for clicado