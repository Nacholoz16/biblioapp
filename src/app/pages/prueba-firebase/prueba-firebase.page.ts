import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba-firebase',
  templateUrl: './prueba-firebase.page.html',
  styleUrls: ['./prueba-firebase.page.scss'],
})
export class PruebaFirebasePage {
  answers: { [key: number]: boolean } = {};

  toggleAnswer(index: number) {
    this.answers[index] = !this.answers[index];
  }
}
