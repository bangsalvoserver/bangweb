async function getCommitHash(apiUrl) {
    const response = await fetch(apiUrl);
    const body = await response.json();
    if ('commit' in body) {
        if ('sha' in body.commit) {
            return body.commit.sha;
        }
    }
    throw new Error('Cannot find commit hash');
}

async function saveToFile(filename, object) {
    const fs = require('fs').promises;
    const result = Object.entries(object)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    console.log(result);
    await fs.writeFile(filename, result);
}

async function main() {
    let env = {
        VITE_BANG_SERVER_COMMIT_HASH: await getCommitHash('https://api.github.com/repos/salvoilmiosi/banggameserver/branches/release')
    };
    const args = require('yargs').argv;
    if ('BANG_SERVER_URL' in args) {
        env['VITE_BANG_SERVER_URL'] = args.BANG_SERVER_URL;
    }
    await saveToFile('.env', env);
}

main().catch(error => { throw error });