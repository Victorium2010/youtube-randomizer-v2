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

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${API_KEY}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error("Canal no encontrado");
    }

    return {
        id: data.items[0].id.channelId,
        name: data.items[0].snippet.title
    };
}
