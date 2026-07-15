const API_KEY = "AIzaSyAPCkiqKnclLLTows-QJvPWEnvFC3_g0dM";

async function getChannelInfo(input) {

    let query = input.trim();

    if (query.includes("@")) {
        query = query.split("@")[1];
    }

    const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${API_KEY}`
    );

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
        throw new Error("Canal no encontrado");
    }

    const channelId = searchData.items[0].id.channelId;

    const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${channelId}&key=${API_KEY}`
    );

    const channelData = await channelResponse.json();

    const channel = channelData.items[0];

    return {
        id: channel.id,
        name: channel.snippet.title,
        uploadsPlaylist: channel.contentDetails.relatedPlaylists.uploads
    };

}
async function getPlaylistPage(playlistId, pageToken = "") {

    let url =
        `https://www.googleapis.com/youtube/v3/playlistItems` +
        `?part=snippet,contentDetails` +
        `&playlistId=${playlistId}` +
        `&maxResults=50` +
        `&key=${API_KEY}`;

    if (pageToken) {
        url += `&pageToken=${pageToken}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
}
async function downloadAllVideos(playlistId) {

    let allVideos = [];
    let nextPageToken = "";

    do {

        const page = await getPlaylistPage(
            playlistId,
            nextPageToken
        );

        if (page.items) {

            allVideos.push(...page.items);

        }

        nextPageToken = page.nextPageToken || "";

        console.log(
            "Vídeos descargados:",
            allVideos.length
        );

    } while (nextPageToken);

    return allVideos;

}
