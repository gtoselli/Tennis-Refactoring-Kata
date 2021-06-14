import { TennisGame } from './TennisGame';

// ------------------------------------------------
// TennisGame1 class
// ------------------------------------------------
export class TennisGame1 implements TennisGame {
	private player_1: Player;
	private player_2: Player;

	constructor(player1Name: string, player2Name: string) {
		this.player_1 = Player.factory({ name: player1Name });
		this.player_2 = Player.factory({ name: player2Name });
	}

	public wonPoint = (playerName: string): void => {
		if (playerName === this.player_1.getName()) this.player_1.wonPoint();
		else if (playerName === this.player_2.getName()) this.player_2.wonPoint();
		else throw 'Player not found';
	};

	public getScore = (): string => {
		if (this.arePlayerTied()) return this.player_1.getScoreNameForTie();

		if (this.areOnePlayerOver4Point()) return this.getAdvantageScoreName();

		return `${this.player_1.getScoreName()}-${this.player_2.getScoreName()}`;
	};

	private arePlayerTied = (): boolean => this.player_1.getScore() === this.player_2.getScore();

	private areOnePlayerOver4Point = (): boolean => this.player_1.getScore() >= 4 || this.player_2.getScore() >= 4;

	private getAdvantageScoreName = (): string => {
		const ahead_player_name = this.getAheadPlayer().getName();
		return this.getAbsScoreDiff() === 1 ? `Advantage ${ahead_player_name}` : `Win for ${ahead_player_name}`;
	};

	private getAbsScoreDiff = (): number => Math.abs(this.player_1.getScore() - this.player_2.getScore());

	private getAheadPlayer = (): Player => (this.player_1.getScore() > this.player_2.getScore() ? this.player_1 : this.player_2);
}

// ------------------------------------------------
// Player class
// ------------------------------------------------
class Player {
	constructor(private _name: string, private _score = 0) {}

	static factory = (data: { name: string; score?: number }) => new Player(data.name, data.score);

	public getName = (): string => this._name;

	public getScore = (): number => this._score;

	public getScoreName = (): string => ScoreMap[this._score];

	public getScoreNameForTie = (): string => (this._score < 3 ? `${this.getScoreName()}-All` : EScoreName.deuce);

	public wonPoint = (): void => {
		this._score += 1;
	};
}

enum EScoreName {
	love = 'Love',
	fifteen = 'Fifteen',
	thirty = 'Thirty',
	deuce = 'Deuce',
	forty = 'Forty',
}

const ScoreMap: Record<number, EScoreName> = {
	0: EScoreName.love,
	1: EScoreName.fifteen,
	2: EScoreName.thirty,
	3: EScoreName.forty,
};
