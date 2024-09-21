import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"little-linguist-cd827","appId":"1:153937990592:web:9b48fc156855f68e976e25","storageBucket":"little-linguist-cd827.appspot.com","apiKey":"AIzaSyBt0WNxu7GojinlaSHqGScbkqs2Tda0peg","authDomain":"little-linguist-cd827.firebaseapp.com","messagingSenderId":"153937990592"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"project-english-f5ff1","appId":"1:585484608882:web:d645235b7f790798caa9eb","storageBucket":"project-english-f5ff1.appspot.com","apiKey":"AIzaSyCpPFLNvGGkr9mFWWnn5lzjnbkR76s9OkY","authDomain":"project-english-f5ff1.firebaseapp.com","messagingSenderId":"585484608882","measurementId":"G-57RSVJ30KJ"})), provideFirestore(() => getFirestore())]
};
