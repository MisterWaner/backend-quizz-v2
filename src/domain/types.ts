export interface IRole {
    id: number;
    name: string;
}

export interface IUser {
    id: string;
    username: string;
    password: string;
    isRegistered: boolean | number;
    currentScore: number;
    currentMonthScore: number;
    lastMonthScore: number;
    // role: IRole['id'];
    // avatar: IAvatar['id'];
}

export interface IAvatar {
    id: number;
    title: string;
    url: string;
}

export interface ISubject {
    id: number;
    label: string;
}

export interface IQuiz {
    length: number;
    subject?: ISubject['id'];
    questions: IQuestion[];
}

export interface IQuestion {
    id: number;
    label: string;
    correctAnswer: string | number;
}

export interface IQCMQuestion extends IQuestion {
    options: string[];
}

export interface ICurrentYearScore {
    id: number;
    score: number;
    month: string;
    subject: ISubject['id'];
    user: IUser['id'];
}

export interface ILastYearScore {
    id: number;
    score: number;
    month: string;
    subject: ISubject['id'];
    user: IUser['id'];
}
