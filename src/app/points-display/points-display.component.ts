import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-points-display',
  standalone: true,
  imports: [],
  templateUrl: './points-display.component.html',
  styleUrl: './points-display.component.css'
})
export class PointsDisplayComponent {
  @Input() points: number = 0; 
}

