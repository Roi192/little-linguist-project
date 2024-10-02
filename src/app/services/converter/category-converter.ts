import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { Language } from "../../../shared/model/language";
import { TranslatedWord } from "../../../shared/model/translated-word";


export const CategoryConverter = {
    toFirestore: (categoryToSave: Category) => {
        const wordsArr = [];
        for (let i = 0; i < categoryToSave.words.length; ++i) {
            wordsArr.push({
                origin: categoryToSave.words[i].origin,
                target: categoryToSave.words[i].target
            });
        }
        return {
            NameCategory: categoryToSave.name,
            LanguageOrigin: categoryToSave.origin,
            LanguageTarget: categoryToSave.target,
            LastUpdate: Timestamp.fromDate(categoryToSave.lastUpdateDate),
            words: wordsArr
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const category = new Category(
            snapshot.id,
            data['NameCategory'],
            data['LanguageOrigin'],
            data['LanguageTarget']
        );
        const words = data['words'];
        if (words) {
            for (let i = 0; i < words.length; ++i) {
                category.words.push(new TranslatedWord(words[i].origin, words[i].target));
            }
        }
        category.lastUpdateDate = data['LastUpdate'].toDate();
        return category;
    }
};
