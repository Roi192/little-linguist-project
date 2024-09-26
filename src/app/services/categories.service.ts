import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Language } from '../../shared/model/language';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesCollection = collection(this.firestore, 'categories');

  constructor(private firestore: Firestore) {}

  async add(category: Category): Promise<void> {
    const categoryDoc = doc(this.categoriesCollection, category.id);
    await setDoc(categoryDoc, {
      lastUpdate: category.lastUpdateDate,
      name: category.name,
      originLanguage: category.origin,
      targetLanguage: category.target,
      words: category.words.map(word => ({
        origin: word.origin,
        target: word.target,
      })),
    });
  }

  //async list():  {
    //const querySnapshot = await collectionData(this.categoriesCollection, { idField: 'id' });
    
  //}

  async get(id: string): Promise<Category> {
    const categoryDoc = doc(this.categoriesCollection, id);
    const categoryData = await getDoc(categoryDoc);
    if (categoryData.exists()) {
      const data = categoryData.data();
      
    }
    throw new Error('Category not found');
  }

  async delete(id: string): Promise<void> {
    const categoryDoc = doc(this.categoriesCollection, id);
    await deleteDoc(categoryDoc);
  }

  async update(id: string, category: Category): Promise<void> {
    const categoryDoc = doc(this.categoriesCollection, id);
    await updateDoc(categoryDoc, {
      lastUpdate: category.lastUpdateDate,
      name: category.name,
      originLanguage: category.origin,
      targetLanguage: category.target,
      words: category.words.map(word => ({
        origin: word.origin,
        target: word.target,
      })),
    });
  }
}
