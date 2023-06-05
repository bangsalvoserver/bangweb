const BANGSERVER_COMMIT_HASH_API = 'https://api.github.com/repos/salvoilmiosi/banggameserver/branches/release';
const BANGSERVER_URL = 'ws://bang.salvoserver.it:47654';

async function main () {
    try {
        const response = await fetch(BANGSERVER_COMMIT_HASH_API);
        const body = JSON.parse(await response.text());

        const commitHash = body['commit']['sha'];

        const result = `REACT_APP_BANG_SERVER_URL=${BANGSERVER_URL}\nREACT_APP_BANG_SERVER_COMMIT_HASH=${commitHash}`;
        
        console.log(result);

        await require('fs').promises.writeFile('.env', result);
    } catch (e) {
        console.error(e);
    }
}

main();