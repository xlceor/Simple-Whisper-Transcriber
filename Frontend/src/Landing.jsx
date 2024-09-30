import Home from './Home'
import Upload from './upload'
import Recorder from './Recorder'

const Landing = ({ file, setFile, uploadFile, fileURL, setFileURL }) => {
    return (
    <div className='flex w-full h-full items-center justify-around '>
        <Home />
        <div className='flex flex-col justify-center items-center'>
            <Recorder setFile={setFile} uploadFile={uploadFile}/>
            <Upload file={file} setFile={setFile} uploadFile={uploadFile} fileURL={fileURL} setFileURL={setFileURL}/>
        </div>
      </div>
    )
}

export default Landing