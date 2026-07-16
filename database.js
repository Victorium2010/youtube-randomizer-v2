let db;

function openDatabase() {
 function addChannel(channel) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction("channels", "readwrite");

        const store = transaction.objectStore("channels");

        const request = store.put(channel);

        request.onsuccess = () => resolve();

        request.onerror = () => reject("Error al guardar el canal");

    });

 }   

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
async function saveChannel(channel) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction("channels", "readwrite");
        const store = transaction.objectStore("channels");

        const request = store.put(channel);

        request.onsuccess = () => resolve();
        request.onerror = () => reject("No se pudo guardar el canal");

    });

}

async function getChannels() {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction("channels", "readonly");
        const store = transaction.objectStore("channels");

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("No se pudieron leer los canales");

    });

}
async function saveVideos(videos) {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction("videos", "readwrite");
        const store = transaction.objectStore("videos");

        for (const video of videos) {

            store.put({
                videoId: video.contentDetails.videoId,
                title: video.snippet.title,
                channelId: video.snippet.channelId,
                channelName: video.snippet.channelTitle,
                publishedAt: video.snippet.publishedAt,
                watched: false
            });

        }

        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject("Error al guardar vídeos");

    });

}
async function getVideos() {

    return new Promise((resolve, reject) => {

        const transaction = db.transaction("videos", "readonly");
        const store = transaction.objectStore("videos");

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject("Error al leer los vídeos");

    });

}
