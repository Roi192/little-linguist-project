import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-words-soreter-game',
  standalone: true,
  imports: [],
  templateUrl: './words-sorter-game.component.html',
  styleUrl: './words-sorter-game.component.css',
})
export class WordsSorterGameComponent  implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input() id = '';



}