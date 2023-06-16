async function getCommitHash(apiUrl) {
    const response = await fetch(apiUrl);
    const body = JSON.parse(await response.text());
    return body['commit']['sha'];
}

async function saveToFile(object, filename) {
    const fs = require('fs').promises;
    const result = Object.entries(object)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    console.log(result);
    await fs.writeFile(filename, result);
}

async function main() {
    try {
        await saveToFile({
            REACT_APP_BANG_CARDS_BASE_URL: 'http://bang.salvoserver.it:81',
            REACT_APP_BANG_SERVER_URL: 'ws://bang.salvoserver.it:47654',
            REACT_APP_BANG_SERVER_COMMIT_HASH: await getCommitHash('https://api.github.com/repos/salvoilmiosi/banggameserver/branches/release')
        }, '.env')
    } catch (e) {
        console.error(e);
    }
}

main();