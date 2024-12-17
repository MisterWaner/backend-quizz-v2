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

interface Question {
    id: number;
    label: string;
    answer: string;
}

interface QCMQuestion extends Question {
    id: number;
    label: Question['label'];
    options: string[];
    correctAnswer: number;
}

export { User, Subject, Quiz, Role, Avatar, Question, QCMQuestion };