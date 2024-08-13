import Upload from "./upload"

const Home = () => {

    return (
        <div className='flex flex-col min-w-full items-center h-dvh'>
        <section className='Header flex justify-between p-3 items-center w-full shadow-lg'>
          <h3 className='font-bold text-2xl '>WTranscriber</h3>
          <button className='bg-gray-800/60'>-</button>
        </section>
        <section className=' flex w-full h-full items-center justify-around'>
          <div className='flex flex-col items-center h-full w-1/2'>
          <span className='absolute -z-50 shadow-[0_0_1000px_50px_rgba(137,74,255,1)] top-44 left-44'></span>
            <h1 className=' mt-20 mb-16 font-bold bg-gradient-to-br from-fuchsia-600 via-blue-600 to-sky-500  bg-clip-text text-transparent text-7xl m-5'>WTranscriber</h1>
            <p className='font-semibold bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent text-2xl text-justify px-5'>
            Transcribe en segundos, con presicion extrema. Sube tu archivo de audio o video (flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, o webm) y obtén una transcripción precisa en segundos.
            </p>
          </div>
          <Upload />
        </section>
      </div>
    )
}

export default Home