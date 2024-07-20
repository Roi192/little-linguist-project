import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-words-sorter-game',
  standalone: true,
  imports: [],
  templateUrl: './words-sorter-game.component.html',
  styleUrl: './words-sorter-game.component.css'
})
export class WordsSorterGameComponent {
  @Input () id=""

}
