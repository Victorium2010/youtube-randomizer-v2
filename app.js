document.addEventListener("DOMContentLoaded", async () => {

    try {

        await openDatabase();

        console.log("Aplicación iniciada");

    } catch (error) {

        console.error(error);

    }

    const addButton = document.getElementById("addChannelBtn");

    addButton.addEventListener("click", async () => {

        const input = document.getElementById("channelInput").value;

        try {

            const channel = await getChannelInfo(input);

            alert(
                "Canal encontrado:\n\n" +
                channel.name +
                "\n" +
                channel.id
            );

        } catch (error) {

            alert(error.message);

        }

    });

});
