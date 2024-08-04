
export class GameProfile {

  public GameId: number;
  public GameName: string;
  public GameDescription: string;
  public GameUrl: string;
  

  constructor(GameId: number, GameName: string, GameDescription: string, GameUrl: string, ) {
    this.GameId = GameId;
    this.GameName = GameName;
    this.GameDescription = GameDescription;
    this.GameUrl = GameUrl;
  }
}