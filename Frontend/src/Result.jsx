


const Result = ({ file, text, fileURL }) => {
    const audioRef = React.useRef(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <div className='flex w-full items-center h-full'>
            <section className='flex h-full w-full justify-center'>
                <div className="flex w-full">
                {file && (
                    <div className=" flex w-full px-5 pb-5 items-center justify-center">
                        <div className="w-1/2 flex items-center justify-center ">
                            {file.type.startsWith('audio') && (
                                <div>
                                    <audio src={fileURL} ref={audioRef}>
                                        Your browser does not support the audio element.
                                        </audio>
                                        <button 
                                        onClick={handlePlay} 
                                        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Play
                                    </button>
                                    <button 
                                        onClick={handlePause} 
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                        Pause
                                    </button>
                                </div>
                                
                            )}
                            {file.type.startsWith('video') && (
                                <video controls width="270" src={fileURL}>
                                Your browser does not support the video element.
                                </video>
                            )}
                        </div>
                        <div className="flex w-full h-full bg-indigo-950 p-20">
                        <p>Text:{text}</p>
                        </div>
                    </div>
                )}
                </div>
            </section>
        </div>
    )
}

export default Result