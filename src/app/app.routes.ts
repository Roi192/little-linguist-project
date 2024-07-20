import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { HelppComponent } from './helpp/helpp.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { WordsSorterGameComponent } from './words-sorter-game/words-sorter-game.component';
import { MixedLetterGameComponent } from './mixed-letter-game/mixed-letter-game.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "choose-game", component:ChooseGameComponent},
    {path: "help", component:HelppComponent},
    {path: "dashbord", component:DashbordComponent},
    {path: "WordSorter", component:WordsSorterGameComponent},
    {path: "MixedLetter", component:MixedLetterGameComponent},
];
