const Env = (() => {
    const commitHash: string | undefined = import.meta.env.VITE_BANG_SERVER_COMMIT_HASH;

    return { commitHash };
})();

export default Env;