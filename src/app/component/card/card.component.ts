import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule],
})
export class CardComponent implements OnInit {
  storedItems: any[] = [];
  constructor() { }

  ngOnInit() {
    const dataFromLocalStorage = localStorage.getItem('Form');
    if (dataFromLocalStorage) {
      this.storedItems = JSON.parse(dataFromLocalStorage);
    }
  }
}
