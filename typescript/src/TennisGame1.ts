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
    if (this.arePlayerTied()) {
      return this.player_1.getScoreNameForTie();
    }

    if (this.areOnePlayerOver4Point()) {
      return this.getAdvantageScoreName();
    }

    return `${this.player_1.getScoreName()}-${this.player_2.getScoreName()}`;
  }

  private arePlayerTied = (): boolean =>
    this.player_1.getScore() === this.player_2.getScore();

  private areOnePlayerOver4Point = (): boolean =>
    this.player_1.getScore() >= 4 || this.player_2.getScore() >= 4;

  private getAdvantageScoreName = (): string => {
    const ahead_player = this.getAheadPlayer();

    return this.getAbsScoreDiff() === 1
      ? `Advantage ${ahead_player.getName()}`
      : `Win for ${ahead_player.getName()}`;
  };

  private getAbsScoreDiff = (): number =>
    Math.abs(this.player_1.getScore() - this.player_2.getScore());

  private getAheadPlayer = (): Player =>
    this.player_1.getScore() > this.player_2.getScore()
      ? this.player_1
      : this.player_2;
}

class Player {
  constructor(private name: string, private score = 0) {}

  static factory = (data: { name: string; score?: number }) =>
    new Player(data.name, data.score);

  public getName = (): string => this.name;

  public getScore = (): number => this.score;

  public getScoreNameForTie = (): string => {
    switch (this.score) {
      case 0:
        return `${EScoreName.love}-All`;
      case 1:
        return `${EScoreName.fifteen}-All`;
      case 2:
        return `${EScoreName.thirty}-All`;
      default:
        return EScoreName.deuce;
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
