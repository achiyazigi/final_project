let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackground,
    });
});

function setPageBackground() {
    let playbackElement = document.getElementsByTagName("video").item(0);
    console.log(playbackElement);
    var captureStream = playbackElement.captureStream();
    var options = { mimeType: "video/webm; codecs=vp9" };
    var recordedChunks = [];
    mediaRecorder = new MediaRecorder(captureStream, options);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();

    function handleDataAvailable(event) {
        console.log("data-available");
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            console.log(recordedChunks);
            download();
        } else {
            // ...
        }
    }
    function download() {
        var blob = new Blob(recordedChunks, {
            type: "audio/wav",
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // demo: to download after 9sec
    setTimeout((event) => {
        console.log("stopping");
        mediaRecorder.stop();
    }, 9000);
}
