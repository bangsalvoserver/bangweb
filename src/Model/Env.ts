const Env = (() => {
    const commitHash: string | undefined = import.meta.env.VITE_BANG_SERVER_COMMIT_HASH;
    const bangServerUrl: string | undefined = import.meta.env.VITE_BANG_SERVER_URL;

    return { commitHash, bangServerUrl };
})();

export default Env;