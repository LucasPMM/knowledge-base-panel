import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  // Receber via input
  public numberOfElements: number = 10;
  public elementsPerPage: number = 10;

  // Output quando muda de pagina

  public numberOfPages: number;
  public paginationArr: number[] = [];
  public paginationNumbers: number[] = [1, 2, 3];

  public pag1Clicked: boolean = true;
  public pag2Clicked: boolean = false;
  public pag3Clicked: boolean = false;

  constructor() { }

  private position1Effects(): void {
    this.pag1Clicked = true;
    this.pag2Clicked = false;
    this.pag3Clicked = false;
    if (this.paginationNumbers[0] > 1) {
      for (let i = 0; i < this.paginationNumbers.length; i += 1) {
        this.paginationNumbers[i] -= 1;
      }
      this.pag1Clicked = false;
      this.pag2Clicked = true;
      this.pag3Clicked = false;
    }
  }

  private position2Effects(): void {
    this.pag1Clicked = false;
    this.pag2Clicked = true;
    this.pag3Clicked = false;
  }

  private position3Effects(): void {
    this.pag1Clicked = false;
    this.pag2Clicked = false;
    this.pag3Clicked = true;
    if (this.numberOfPages > this.paginationNumbers[2]) {
      for (let i = 0; i < this.paginationNumbers.length; i += 1) {
        this.paginationNumbers[i] += 1;
      }
      this.pag1Clicked = false;
      this.pag2Clicked = true;
      this.pag3Clicked = false;
    }
  }

  public changePage(index: number) {
    const position = this.paginationNumbers.indexOf(index);
    if (position === 0) {
      this.position1Effects();
    } else if (position === 1) {
      this.position2Effects();
    } else if (position === 2) {
      this.position3Effects();
    }
  }

  public changeButton(type: 'next' | 'previous'): void {
    if (type === 'next' && this.numberOfPages > 1) {
      if (this.pag1Clicked) {
        if (this.numberOfPages > 1) {
          this.position2Effects();
        }
      } else if (this.pag2Clicked) {
        this.position3Effects();
      }
    } else if (type === 'previous') {
      if (this.pag2Clicked) {
        this.pag1Clicked = true;
        this.pag2Clicked = false;
        this.pag3Clicked = false;
        if (this.paginationNumbers[0] > 1) {
          for (let i = 0; i < this.paginationNumbers.length; i += 1) {
            this.paginationNumbers[i] -= 1;
          }
          this.position2Effects();
        }
      } else if (this.pag3Clicked) {
        this.position2Effects();
        if (this.paginationNumbers[0] > 1) {
          for (let i = 0; i < this.paginationNumbers.length; i += 1) {
            this.paginationNumbers[i] -= 1;
          }
          this.position2Effects();
        }
      }
    }
  }

  private setNumberOfPages(): void {
    this.numberOfPages = Math.ceil(this.numberOfElements / this.elementsPerPage);
    if (this.numberOfPages) {
      for (let i = 0; i < this.numberOfPages; i += 1) {
        this.paginationArr.push(this.numberOfPages);
      }
    }
  }

  ngOnInit() {
    this.setNumberOfPages();
  }

}
