import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public id: number;
  public cards: string[] ;
  public cardsNumber: number;
  public cursor: number;

  private colors = ['C', 'D', 'H', 'S'];
  private cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.cardsNumber = 5;
    this.cards = [];
    for (let i = 0; i < this.cardsNumber; i++) {
      this.cards.push('green_back');
    }
    this.cursor = 0;
  }

  nextCard(): void {
    if (this.cursor === 0) {
      this.reset();
    }
    const randomColor = this.colors[Math.floor(Math.random() * (this.colors.length ))];
    const randomCardNumber =  this.cardNumbers[Math.floor(Math.random() * (this.cardNumbers.length ))];
    this.cards[this.cursor] =  randomCardNumber + randomColor;
    this.cursor = (this.cursor + 1) % this.cardsNumber;
  }

  reset(): void {
    for (let i = 0; i < this.cardsNumber; i++) {
      this.cards[i] = 'green_back';
    }
    this.cursor = 0;
  }

}
