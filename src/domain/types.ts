export type Role = {
    id: number;
    name: string;
};

export type Avatar = {
    id: number;
    title: string;
    url: string;
};

export type User = {
    id: string;
    username: string;
    password: string;
    isRegistered: boolean | number;
    score?: number;
    currentMonthScore?: number;
    lastMonthScore?: number;
    //rank: number;
    //role: Role;
    //avatar: Avatar;
};

export type Subject = {
    id: number;
    label: string;
};

export type Quiz = {
    length: number;
    subject?: Subject;
    questions: Question[];
};

export type Question = {
    id: number;
    label: string;
    correctAnswer: string | number;
};

export type QCMQuestion = {
    id: number;
    label: string;
    options: string[];
    correctAnswer: number;
};
