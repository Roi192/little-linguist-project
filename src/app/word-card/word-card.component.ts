import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatedWord } from '../../shared/model/translated-word';
import { WordStatus } from '../../shared/model/Word-Status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.css'
})
export class WordCardComponent {
  @Input() word!: TranslatedWord;
  @Input() status!: WordStatus;
  @Output() wordSelected = new EventEmitter<void>();

  onSelect() {
    this.wordSelected.emit();
  }
}