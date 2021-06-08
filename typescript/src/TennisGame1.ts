import { TennisGame } from "./TennisGame";

export class TennisGame1 implements TennisGame {
  private player_1: Player;
  private player_2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player_1 = Player.factory({ name: player1Name });
    this.player_2 = Player.factory({ name: player2Name });
  }

  public wonPoint(playerName: string): void {
    if (playerName === "player1") this.player_1.wonPoint();
    else this.player_2.wonPoint();
  }

  public getScore(): string {
    // Caso 1: parità tra due giocatori
    if (this.arePlayerTied()) {
      return this.player_1.getScoreNameTie();
    }

    // Caso 2: uno dei due giocatori ha superato i 4 punti
    else if (this.player_1.getScore() >= 4 || this.player_2.getScore() >= 4) {
      return this.getAdvantageScoreName();
    }

    // Caso 3: nessuno dei due giocatori è arrivato ancora ai 4 punti
    return `${this.player_1.getScoreName()}-${this.player_2.getScoreName()}`;
  }

  private arePlayerTied = (): boolean =>
    this.player_1.getScore() === this.player_2.getScore();

  private getAdvantageScoreName = (): string => {
    const score_diff: number =
      this.player_1.getScore() - this.player_2.getScore();
    if (score_diff === 1) return "Advantage player1";
    else if (score_diff === -1) return "Advantage player2";
    else if (score_diff >= 2) return "Win for player1";
    else return "Win for player2";
  };
}

class Player {
  constructor(private name: string, private score = 0) {}

  static factory = (data: { name: string; score?: number }) =>
    new Player(data.name, data.score);

  public getName = (): string => this.name;

  public getScore = (): number => this.score;

  public getScoreNameTie = (): string => {
    switch (this.score) {
      case 0:
        return ETieScoreName.love_all;
      case 1:
        return ETieScoreName.fifteen_all;
      case 2:
        return ETieScoreName.thirty_all;
      default:
        return ETieScoreName.deuce;
    }
  };

  public getScoreName = (): string => {
    switch (this.score) {
      case 0:
        return EScoreName.love;
      case 1:
        return EScoreName.fifteen;
      case 2:
        return EScoreName.thirty;
      case 3:
        return EScoreName.forty;
    }
  };

  public wonPoint = (): void => {
    this.score += 1;
  };
}

enum EScoreName {
  love = "Love",
  fifteen = "Fifteen",
  thirty = "Thirty",
  deuce = "Deuce",
  forty = "Forty",
}

enum ETieScoreName {
  love_all = "Love-All",
  fifteen_all = "Fifteen-All",
  thirty_all = "Thirty-All",
  deuce = "Deuce",
}
