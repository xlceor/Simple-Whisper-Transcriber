import { useState } from "react";
import micro from './assets/micro.png';

const Recorder = ({ setFile, uploadFile }) => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            let chunks = [];
    
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
    
            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/mpeg' });
                handleUpload(blob);
            };
    
            recorder.start();
            setRecording(true);
            setMediaRecorder(recorder);
        } catch (error) {
            console.error('Error al acceder al micrófono:', error);
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setRecording(false);
            setMediaRecorder(null);
        }
    };

    const handleUpload = (blob) => {
        const file = new File([blob], "audio.mp3", { type: "audio/mpeg" });
        setFile(file);
        uploadFile(file);
    }

    return (
        <div className="flex items-center gap-4 p-6 m-3 bg-indigo-900/70 backdrop-blur-xl shadow-2xl border border-white/10 rounded-xl w-full transition-all duration-300">
            <div className="flex">
                {!recording ? (
                    <button className="flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full w-20 h-20 shadow-lg hover:bg-opacity-80 transition-all duration-300 active:scale-90" onClick={startRecording}>
                        <img className='micro w-10 h-10' src={micro} alt="micro" />
                    </button>
                ) : (
                    <button className="flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full w-20 h-20 shadow-lg hover:bg-opacity-80 transition-all duration-300 active:scale-90" onClick={stopRecording}>
                        <img className='micro w-10 h-10' src={micro} alt="micro" />
                    </button>
                )}
            </div>
            <h2 className={`text-lg font-semibold ${recording ? "text-red-600" : "text-gray-z00"}`}>
                {recording ? "Grabando..." : "Inicia la grabación"}
            </h2>
        </div>
    );
}

export default Recorder;
