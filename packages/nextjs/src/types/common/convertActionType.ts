type EventTypeMap<T extends { [key: string]: {} }> = { [K in keyof T]: { type: K; payload: T[K] } }

type ConvertActionType<T extends { [key: string]: {} }> = EventTypeMap<T>[keyof EventTypeMap<T>]

export type { ConvertActionType }
