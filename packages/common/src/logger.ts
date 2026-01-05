import pino from "pino";

import type { Logger, LoggerOptions } from "pino";

type CreateLoggerOptions = LoggerOptions & {
    name: string;
}

/*
declare module "pino" {
    interface LoggerOptions {
        name?: string;
    }
}
*/

export const createLogger = (option: CreateLoggerOptions): Logger => {

    const { name, ...rest } = option;

    const transport = 
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
            },
        }
      : undefined;

    return pino({
        name,
        level: process.env.LOG_LEVEL || "info",
        transport,
        ...rest,
    })
}