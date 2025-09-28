export enum StatusLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export interface Log {
    key: number;
    date: Date;
    content: string;
    level: StatusLevel;
}

export const logs_mock: Log[] = [
    {
        date: new Date("10-08-2006"),
        content: "Hello world",
        level: StatusLevel.LOW,
        key: 1,
    },
    {
        date: new Date("11-08-2006"),
        content: "Hello world 2",
        level: StatusLevel.MEDIUM,
        key: 2,
    },
    {
        date: new Date("12-08-2006"),
        content: "Hello world 3",
        level: StatusLevel.HIGH,
        key: 3,
    },
];
