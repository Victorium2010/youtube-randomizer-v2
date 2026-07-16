document.addEventListener("DOMContentLoaded", async () => {

    try {
        await openDatabase();
        await loadChannels();
    } catch (error) {
        console.error(error);
    }

    document.getElementById("addChannelBtn").addEventListener("click", async () => {

        const input = document.getElementById("channelInput").value.trim();

        if (!input) return;

        try {

            const channel = await getChannelInfo(input);

const videos = await downloadAllVideos(channel.uploadsPlaylist);

await saveVideos(videos);

alert("Se han descargado y guardado " + videos.length + " vídeos.");

await saveChannel(channel);

document.getElementById("channelInput").value = "";

await loadChannels();

        } catch (error) {

            alert(error.message);

        }

    });

});

async function loadChannels() {

    const channels = await getChannels();

    const container = document.getElementById("channels");

    container.innerHTML = "";

    channels.forEach(channel => {

        const div = document.createElement("div");

        div.textContent = "📺 " + channel.name;

        container.appendChild(div);

    });

}
document.getElementById("randomBtn").addEventListener("click", async () => {

    const videos = await getVideos();

    if (videos.length === 0) {
        alert("No hay vídeos guardados.");
        return;
    }

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    document.getElementById("result").innerHTML = `
        <h3>${randomVideo.title}</h3>
        <p>${randomVideo.channelName}</p>
        <a href="https://www.youtube.com/watch?v=${randomVideo.videoId}" target="_blank">
            Ver vídeo
        </a>
    `;

});
