const Env = (() => {
    const bangServerUrl: string | undefined = import.meta.env.VITE_BANG_SERVER_URL;
    const cardsBaseUrl: string | undefined = import.meta.env.VITE_BANG_CARDS_BASE_URL;
    const commitHash: string | undefined = import.meta.env.VITE_BANG_SERVER_COMMIT_HASH;

    if (!bangServerUrl) {
        throw new Error('VITE_BANG_SERVER_URL is not set. Try running npm run build_env');
    }
    if (!cardsBaseUrl) {
        throw new Error('VITE_BANG_CARDS_BASE_URL is not set. Try running npm run build_env');
    }

    return { bangServerUrl, cardsBaseUrl, commitHash };
})();

export default Env;