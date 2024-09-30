import './App.css';
import Landing from './Landing';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Result from './Result'; // Asegúrate de que la importación sea correcta
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Usar useNavigate para redirección

  const uploadFile = async (file) => {
    try {
      
      const formData = new FormData();
      formData.append('audio', file);
      
      navigate('/result');

      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setText(result.transcription);
        setStatus(result.result);
        alert('File uploaded successfully!');

      } else {
        alert('Failed to upload file.');
        navigate('/');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  // Efecto para redirigir si el estado no es "ok"
  useEffect(() => {
    if (status && status !== "ok") {
      navigate('/'); // Redirigir a la raíz si status no es "ok"
    }
  }, [status, navigate]);

  return (
    <div className='backdrop-blur-3xl'>
      <Navbar />
      <div className='flex pt-10'>
        <Routes>
          <Route path="/" element={<Landing file={file} setFile={setFile} uploadFile={uploadFile} />} />
          <Route path="/result" element={file ? <Result file={file} transcription={text} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;