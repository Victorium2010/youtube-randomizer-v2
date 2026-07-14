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
