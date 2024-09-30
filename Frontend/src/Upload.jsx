import { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Upload = ({ file, setFile, uploadFile }) => {
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      setDragActive(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setDragActive(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        if (validateFileType(droppedFile)) {
          setFile(droppedFile);
          uploadFile(droppedFile);
        } else {
          alert('Tipo de archivo no válido. Por favor, sube un archivo válido.');
        }
      }
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  const validateFileType = (file) => {
    const validTypes = [
      'audio/flac', 'audio/mp3', 'audio/mp4', 'video/mpeg',
      'audio/mpga', 'audio/m4a', 'audio/ogg', 'audio/wav',
      'video/webm', 'audio/webm', 'audio/mpeg'
    ];
    return validTypes.includes(file.type);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFileType(selectedFile)) {
        setFile(selectedFile);
        uploadFile(selectedFile);
      } else {
        alert('Tipo de archivo no válido. Por favor, sube un archivo válido.');
      }
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('input-file-upload').click();
  };

  return (
    <div className={`w-[30rem] h-96 rounded-xl bg-indigo-900/50  backdrop-blur-3xl shadow-2xl  flex flex-col justify-center items-center border-8 
      ${dragActive ? 'border-indigo-500' : 'border-gray-100'} border-dashed transition-all duration-300`}>
      <span className='absolute -z-50 shadow-[0_0_1000px_50px_rgba(137,74,255,1)] bottom-56'></span>
      <form onSubmit={(e) => e.preventDefault()} className='w-full h-full flex flex-col justify-center items-center'>
        <input
          type="file"
          id="input-file-upload"
          style={{ display: 'none' }}
          accept=".flac,.mp3,.mp4,.mpeg,.mpga,.m4a,.ogg,.wav,.webm"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="input-file-upload"
          className={`file-upload flex flex-col justify-center items-center p-4 transition-colors duration-300 `}
          onDrop={(e) => e.preventDefault()}
        >
          <div className='flex flex-col justify-center items-center'>
            <FaCloudUploadAlt className="w-20 h-20 text-indigo-200 transition-transform transform hover:scale-105" />
            <p className=' font-semibold text-lg text-center mt-2'>Arrastra y suelta tu archivo o haz clic para subirlo</p>
            <button 
              type="button" 
              onClick={triggerFileUpload} 
              className='mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg'
            >
              Seleccionar Archivo
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default Upload;
