export type Language = 'en' | 'it';

const Env = {
    bangServerUrl: import.meta.env.VITE_BANG_SERVER_URL as string | undefined,
    language: import.meta.env.VITE_LANGUAGE as Language | undefined,
    discordLink: import.meta.env.VITE_DISCORD_LINK as string | undefined,
};

export default Env;