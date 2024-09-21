import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { HelppComponent } from './helpp/helpp.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { WordsSorterGameComponent } from './words-sorter-game/words-sorter-game.component';
import { MixedLetterGameComponent } from './mixed-letter-game/mixed-letter-game.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { NgModule } from '@angular/core';
import { SummaryGameComponent } from './summary-game/summary-game.component';

export const routes: Routes = [
  { path: '', component: DashbordComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'choose-game', component: ChooseGameComponent },
  { path: 'help', component: HelppComponent },
  { path: 'admin', component: CategoriesListComponent },
  { path: 'word-sorter/:id', component: WordsSorterGameComponent },
  { path: 'mixed-letter/:id', component: MixedLetterGameComponent },
  { path: 'trivia/:id', component: TriviaGameComponent },
  { path: 'summary', component: SummaryGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
