export type Language = 'en' | 'it';

const Env = (() => {
    const bangServerUrl = import.meta.env.VITE_BANG_SERVER_URL as string | undefined;
    const language = import.meta.env.VITE_LANGUAGE as Language | undefined;
    const discordLink = import.meta.env.VITE_DISCORD_LINK as string | undefined;

    if (!bangServerUrl) {
        throw new Error('missing BANG_SERVER_URL environment variable');
    }

    let bangTrackingUrl = bangServerUrl.replace('wss://', 'https://').replace('ws://', 'http://');
    if (!bangTrackingUrl.endsWith('/')) {
        bangTrackingUrl += '/';
    }
    bangTrackingUrl += 'tracking';

    return { bangServerUrl, bangTrackingUrl, language, discordLink } as const;
})();

export default Env;