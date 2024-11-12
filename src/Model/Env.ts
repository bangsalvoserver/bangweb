export type Language = 'en' | 'it';

const Env = (() => {
    const bangServerUrl = import.meta.env.VITE_BANG_SERVER_URL as string | undefined;
    const language = import.meta.env.VITE_LANGUAGE as Language | undefined;
    const discordLink = import.meta.env.VITE_DISCORD_LINK as string | undefined;
    const paypalDonateLink = import.meta.env.VITE_PAYPAL_DONATE_LINK as string | undefined;

    if (!bangServerUrl) {
        throw new Error('missing BANG_SERVER_URL environment variable');
    }

    let bangServerBaseUrl = bangServerUrl.replace('wss://', 'https://').replace('ws://', 'http://');
    if (!bangServerBaseUrl.endsWith('/')) {
        bangServerBaseUrl += '/';
    }
    
    const bangTrackingUrl = bangServerBaseUrl + 'tracking';
    const bangImageUrl = bangServerBaseUrl + 'image';

    return { bangServerUrl, bangTrackingUrl, bangImageUrl, language, discordLink, paypalDonateLink } as const;
})();

export default Env;