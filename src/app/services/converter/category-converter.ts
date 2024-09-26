import { Category } from "../../../shared/model/category";
import { Language } from "../../../shared/model/language";
import { TranslatedWord } from "../../../shared/model/translated-word";

export const CategoryConverter = {
    toFirestore: (categoryToSave: Category) => {
        const wordsArr = [];
        for (let i=0; i<categoryToSave.words.length; ++i){
            wordsArr.push (
               
                
            )
        }
      
   
    }
}

