const client_id = '2c975b81a88e4032b505b89b41320195';
const client_secret = 'c145d961cdd848c8a4e208b69a986e54';

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: `grant_type=client_credentials`
    });

    const data = await result.json();
    return data.access_token;
}

const fetchTemplate = async (url, method = 'GET') => {
    let token = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/` + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    if (result.ok) {
        return await result.json()
    } else {
        switch (result.status) {
            case 401:
                throw new Error("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.")
            case 403:
                throw new Error("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.")
            case 404:
                throw new Error("There's no data. Try to reload page.")
            default:
                throw new Error("Something went wrong")
        }
    }
}

export const findAlbums = async (question, page) => {
    try {
        const np = page;
        const limit = 24;
        const url = `search?type=album&q=${question}&limit=${limit}&offset=${(np - 1) * limit}`;

        let data = fetchTemplate(url);
        return await data;
    } catch (e) {
        alert(e);
    }
}

export const getTracks = async (id) => {
    try {
        const url = `albums/${id}/tracks`;
        let data = await fetchTemplate(url);
        return await data;
    } catch (e) {
        alert(e);
    }
}