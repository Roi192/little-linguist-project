import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, getDoc, docData, QuerySnapshot, getDocs, DocumentSnapshot, addDoc } from '@angular/fire/firestore';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Language } from '../../shared/model/language';
import { CategoryConverter } from './converter/category-converter';
import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesCollection = collection(this.firestore, 'categories').withConverter(CategoryConverter);
  

  constructor(private firestore: Firestore) {}

 
   async list(): Promise<Category[]> {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(CategoryConverter);
    
    const querySnapshot: QuerySnapshot<Category> = await getDocs(categoryCollection);
    const result: Category[] = [];
  
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        // הגדר את ה-id לקטגוריה מהמסמך ב-Firestore
        data.id = docSnap.id;
        result.push(data);
      }
    });
  
    return result;
  }

  async add(newCategoryData: Category): Promise<void> {
    const categoryCollection = collection(this.firestore,'categories').withConverter(CategoryConverter)
     await addDoc (categoryCollection,newCategoryData)
  }

  

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestore, 'categories',id).withConverter(
    CategoryConverter
    );
    //return (await getDoc(categoryDocRef)).data();
   //}
   const docSnap = await getDoc(categoryDocRef);
   if (docSnap.exists()) {
     return docSnap.data(); // מחזיר את הנתונים של המסמך
   } else {
     console.error('Category not found');
     return undefined; // מחזיר undefined אם המסמך לא קיים
   }
  }
   async delete(existingCategoryId: string) {
    const categoryDocRef = doc(
    this.firestore,
    'categories',existingCategoryId
    ).withConverter(CategoryConverter);
   
    return deleteDoc(categoryDocRef);
    
      }
  
   

  async update(existingCategory: Category): Promise<void> {
 const personDocRef = doc(
 this.firestore,
 'categories',existingCategory.id
 ).withConverter(CategoryConverter);
 return setDoc(personDocRef, existingCategory);
}


async saveCategory() {
  const newCategory = new Category('', 'name', Language.English, Language.Hebrew);
  await this.add(newCategory); 
}

}


