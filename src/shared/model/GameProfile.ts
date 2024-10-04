
export class GameProfile {

  public GameId: string;
  public GameName: string;
  public GameDescription: string;
  public GameUrl: string;
  

  constructor(GameId:string, GameName: string, GameDescription: string, GameUrl: string, ) {
    this.GameId = GameId;
    this.GameName = GameName;
    this.GameDescription = GameDescription;
    this.GameUrl = GameUrl;
  }
}