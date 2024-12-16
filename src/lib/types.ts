type Role = {
    id: number;
    name: string;
}

type Avatar = {
    id: number;
    title: string;
    url: string;
}

type User = {
    id: number;
    username: string;
    password: string;
    isRegistered: boolean;
    score: number;
    currentMonthScore: number;
    lastMonthScore: number;
    rank: number;
    role: Role;
    avatar: Avatar;
}

type Subject = {
    id: number;
    label: string;
}

type Quiz = {
    id: number;
    length: number;
    subject: Subject;
    questions: Question[];
}

type Question = {
    id: number;
    label: string;
    answer: string;
}

type QCMQuestion<T extends Question> = {
    id: number;
    label: Question['label'];
    options: T['answer'][];
    correctAnswer: T['answer'];
}

export type { User, Subject, Quiz, Role, Avatar, Question, QCMQuestion };