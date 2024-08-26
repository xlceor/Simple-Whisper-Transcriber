import './App.css'
import Home from './home'
import Navbar from './Navbar'
import { useState } from 'react'
import Upload from './upload'
import Result from './result'

function App() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('');
  const [fileURL, setFileURL] = useState('');

  const uploadFile = async (file) => {
    try {
      // Crear un FormData para enviar el archivo al backend
      const formData = new FormData();
      formData.append('audio', file);

      // Enviar el archivo al backend
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Suponiendo que el backend devuelve la duración del archivo
        const result = await response.json();
        // setName(file.name);
        // setDuration(result.duration);
        setText(result.transcription)

        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className='flex pt-10'>
        {!file ? (
          <div className='flex w-full h-full items-center justify-around '>
            <Home />
            <Upload file={file} setFile={setFile} uploadFile={uploadFile} fileURL={fileURL} setFileURL={setFileURL}/>
          </div>
        ):(
          <Result file={file} text={text} fileURL={fileURL} />
        )}
      </div>
    </div>
  )
}

export default App
