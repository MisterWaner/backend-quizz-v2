import { IUser } from '../types';

export class UserService implements IUser {
    id: string;
    username: string;
    password: string;
    isRegistered: number | boolean;

    constructor(
        id: string,
        username: string,
        password: string,
        isRegistered: number | boolean
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isRegistered = isRegistered;
    }

}
