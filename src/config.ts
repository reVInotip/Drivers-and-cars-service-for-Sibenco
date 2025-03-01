import messages, {TMessages} from './properties/messages';
import errors, {TErrors} from './properties/errors';

interface IConfig {
    port: number,
    PAGE_SIZE: number,
    messages: TMessages,
    errors: TErrors,
}

export const config: IConfig = {
    port: 0,
    PAGE_SIZE: 30,
    messages: messages,
    errors: errors
}

export function LoadConfig() {
    config.port = process.env.PORT ? Number(process.env.PORT) : 8008;
}
