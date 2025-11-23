export const LANGUAGES = [ 'it', 'en', 'cs' ] as const;
export type Language = typeof LANGUAGES[number];

const Env = (() => {
    const bangServerUrl = import.meta.env.VITE_BANG_SERVER_URL as string | undefined;
    const language = import.meta.env.VITE_LANGUAGE as Language | undefined;
    const discordLink = import.meta.env.VITE_DISCORD_LINK as string | undefined;

    if (!bangServerUrl) {
        throw new Error('missing BANG_SERVER_URL environment variable');
    }

    let bangServerBaseUrl = bangServerUrl.replace('wss://', 'https://').replace('ws://', 'http://');
    if (!bangServerBaseUrl.endsWith('/')) {
        bangServerBaseUrl += '/';
    }
    
    const bangTrackingUrl = bangServerBaseUrl + 'tracking';
    const bangCardsUrl = bangServerBaseUrl + 'cards';
    const bangImageUrl = bangServerBaseUrl + 'image';

    return { bangServerUrl, bangTrackingUrl, bangCardsUrl, bangImageUrl, language, discordLink } as const;
})();

export default Env;