document.addEventListener("DOMContentLoaded", async () => {

    try {

        await openDatabase();

        await addChannel({
            id: "prueba",
            name: "Canal de prueba"
        });

        console.log("Canal guardado correctamente");

    } catch (error) {

        console.error(error);

    }

});
