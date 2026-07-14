let db;

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open("YouTubeRandomizerDB", 1);

        request.onupgradeneeded = function (event) {

            db = event.target.result;

            if (!db.objectStoreNames.contains("channels")) {

                db.createObjectStore("channels", {
                    keyPath: "id"
                });

            }

            if (!db.objectStoreNames.contains("videos")) {

                db.createObjectStore("videos", {
                    keyPath: "videoId"
                });

            }

        };

        request.onsuccess = function (event) {

            db = event.target.result;
            console.log("Base de datos abierta");

            resolve();

        };

        request.onerror = function () {

            reject("Error al abrir la base de datos");

        };

    });

}
