import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player_1: Player;
  private player_2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player_1 = Player.factory({ name: player1Name });
    this.player_2 = Player.factory({ name: player2Name });
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.player_1.wonPoint();
    else this.player_2.wonPoint();
  }

  getScore(): string {
    let score: string = "";
    let tempScore: number = 0;
    if (this.player_1.getScore() === this.player_2.getScore()) {
      switch (this.player_1.getScore()) {
        case 0:
          score = "Love-All";
          break;
        case 1:
          score = "Fifteen-All";
          break;
        case 2:
          score = "Thirty-All";
          break;
        default:
          score = "Deuce";
          break;
      }
    } else if (this.player_1.getScore() >= 4 || this.player_2.getScore() >= 4) {
      const minusResult: number =
        this.player_1.getScore() - this.player_2.getScore();
      if (minusResult === 1) score = "Advantage player1";
      else if (minusResult === -1) score = "Advantage player2";
      else if (minusResult >= 2) score = "Win for player1";
      else score = "Win for player2";
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.player_1.getScore();
        else {
          score += "-";
          tempScore = this.player_2.getScore();
        }
        switch (tempScore) {
          case 0:
            score += "Love";
            break;
          case 1:
            score += "Fifteen";
            break;
          case 2:
            score += "Thirty";
            break;
          case 3:
            score += "Forty";
            break;
        }
      }
    }
    return score;
  }
}

class Player {
  constructor(private name: string, private score = 0) {}

  static factory = (data: { name: string; score?: number }) =>
    new Player(data.name, data.score);

  public getName = (): string => this.name;
  public getScore = (): number => this.score;

  public wonPoint = (): void => {
    this.score += 1;
  };
}
