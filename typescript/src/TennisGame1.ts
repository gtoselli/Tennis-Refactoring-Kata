import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
	private player_1: Player;
	private player_2: Player;

	constructor(player1Name: string, player2Name: string) {
		this.player_1 = Player.factory({ name: player1Name });
		this.player_2 = Player.factory({ name: player2Name });
	}

	public wonPoint(playerName: string): void {
		if (playerName === 'player1') this.player_1.wonPoint();
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

	private arePlayerTied = (): boolean => this.player_1.getScore() === this.player_2.getScore();

	private areOnePlayerOver4Point = (): boolean => this.player_1.getScore() >= 4 || this.player_2.getScore() >= 4;

	private getAdvantageScoreName = (): string => {
		const ahead_player_name = this.getAheadPlayer().getName();
		return this.getAbsScoreDiff() === 1 ? `Advantage ${ahead_player_name}` : `Win for ${ahead_player_name}`;
	};

	private getAbsScoreDiff = (): number => Math.abs(this.player_1.getScore() - this.player_2.getScore());

	private getAheadPlayer = (): Player => (this.player_1.getScore() > this.player_2.getScore() ? this.player_1 : this.player_2);
}

class Player {
	constructor(private name: string, private score = 0) {}

	static factory = (data: { name: string; score?: number }) => new Player(data.name, data.score);

	public getName = (): string => this.name;

	public getScore = (): number => this.score;

	public getScoreName = (): string => ScoreMap[this.score];

	public getScoreNameForTie = (): string => (this.score < 3 ? `${this.getScoreName()}-All` : EScoreName.deuce);

	public wonPoint = (): void => {
		this.score += 1;
	};
}

enum EScoreName {
	love = 'Love',
	fifteen = 'Fifteen',
	thirty = 'Thirty',
	deuce = 'Deuce',
	forty = 'Forty',
}

const ScoreMap = {
	0: EScoreName.love,
	1: EScoreName.fifteen,
	2: EScoreName.thirty,
	3: EScoreName.forty,
};
