const API_KEY = "AIzaSyAPCkiqKnclLLTows-QJvPWEnvFC3_g0dM";

async function getChannelInfo(input) {

    let query = input.trim();

    if (query.includes("@")) {
        query = query.split("@")[1];
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
