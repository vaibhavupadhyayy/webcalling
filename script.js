const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

let localStream;
let remoteStream;
let peerConnection;

startCallButton.addEventListener('click', startCall);
endCallButton.addEventListener('click', endCall);

async function startCall() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection();

    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    peerConnection.onicecandidate = handleICECandidateEvent;
    peerConnection.ontrack = handleTrackEvent;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer to the other peer using your signaling server
    // (You'll need to implement this part using a WebSocket or another method)

    startCallButton.disabled = true;
    endCallButton.disabled = false;
}

async function endCall() {
    peerConnection.close();
    localStream.getTracks().forEach((track) => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    startCallButton.disabled = false;
    endCallButton.disabled = true;
}

function handleICECandidateEvent(event) {
    if (event.candidate) {
        // Send the ICE candidate to the other peer using your signaling server
    }
}

function handleTrackEvent(event) {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
}
