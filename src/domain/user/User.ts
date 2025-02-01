import { getNanoid } from '../../lib/helpers';
import { IUser } from '../types';

export class User implements IUser {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public isRegistered: boolean | number,
        public currentScore: number,
        public currentMonthScore: number,
        public lastMonthScore: number
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isRegistered = isRegistered;
        this.currentScore = currentScore;
        this.currentMonthScore = currentMonthScore;
        this.lastMonthScore = lastMonthScore;
    }

    static async register(username: string, password: string): Promise<User> {
        const id = await getNanoid();

        return new User(id, username, password, 1, 0, 0, 0);
    }
}
