import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { GameResult } from "../../../shared/model/GameResult";


export const gameresultconverter : FirestoreDataConverter <GameResult> = {
    toFirestore : (gameResultToSave : GameResult) => {
        return {
            categoryId : gameResultToSave.categoryId,
            gameId : gameResultToSave.gameId,
            date : gameResultToSave.date,
            points : gameResultToSave.points,
        };
    },
    fromFirestore :(
        snapshot : QueryDocumentSnapshot,
        options: SnapshotOptions
    ) : GameResult => {
        const data =snapshot.data (options)
        const gameResult = new GameResult (
            data ['categoryId'],
           data ['gameId'],
            data ['date'].toDate(),
            data ['points'],
            

        );
        return gameResult
    }
}