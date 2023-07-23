const Env = (() => {
    const commitHash: string | undefined = import.meta.env.VITE_BANG_SERVER_COMMIT_HASH;
    const bangServerUrl: string | undefined = import.meta.env.VITE_BANG_SERVER_URL;
    const bangCardsBaseUrl: string | undefined = import.meta.env.VITE_BANG_CARDS_BASE_URL;

    return { commitHash, bangServerUrl, bangCardsBaseUrl };
})();

export default Env;