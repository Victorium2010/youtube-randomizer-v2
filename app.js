document.addEventListener("DOMContentLoaded", async () => {

    try {

        await openDatabase();

        console.log("Aplicación iniciada");

    } catch (error) {

        console.error(error);

    }

});
