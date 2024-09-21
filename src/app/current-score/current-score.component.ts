import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-score',
  standalone: true,
  imports: [],
  templateUrl: './current-score.component.html',
  styleUrl: './current-score.component.css'
})
export class CurrentScoreComponent {
  @Input() score: number = 0;
}
