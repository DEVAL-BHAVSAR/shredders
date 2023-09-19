let isRecording = false;
let mediaRecorder;
let audioChunks = [];

const microphoneButton = document.getElementById("microphoneButton");
const audioPlayer = document.getElementById("audioPlayer");

microphoneButton.addEventListener("click", () => {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
});

function startRecording() {
    isRecording = true;
    microphoneButton.textContent = "Stop Recording";

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);

                audioPlayer.src = audioUrl;

                audioChunks = [];
            };

            mediaRecorder.start();
        })
        .catch((error) => {
            console.error("Error accessing microphone:", error);
            isRecording = false;
            microphoneButton.textContent = "Start Recording";
        });
}

function stopRecording() {
    isRecording = false;
    microphoneButton.textContent = "Start Recording";

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}


// Copy Button Functionality
const copyButton = document.getElementById("copyButton");
const textBox = document.getElementById("textBox");

copyButton.addEventListener("click", () => {
    textBox.select();
    document.execCommand("copy");
});


