import { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

// 

const Upload = ({ file, setFile, uploadFile, fileURL, setFileURL }) => {
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
          if (!isFileAlreadyUploaded(droppedFile)) {
            setFile(droppedFile);
            uploadFile(droppedFile);
          } else {
            alert('This file has already been uploaded.');
          }
        } else {
          alert('Invalid file type. Please upload a valid file.');
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
      'video/webm', 'audio/webm', 'audio/mpeg', 'video/mp4' // Añadir 'audio/mpeg' aquí
    ];
    return validTypes.includes(file.type);
  };

  const isFileAlreadyUploaded = (newFile) => {
    return file && newFile.name === file.name && newFile.size === file.size;
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFileType(selectedFile)) {
        if (!isFileAlreadyUploaded(selectedFile)) {
        if (fileURL) {
          URL.revokeObjectURL(fileURL);
        }

        // Luego, configura el archivo y la URL del archivo
        setFile(selectedFile);
        const newFileURL = URL.createObjectURL(selectedFile);
        setFileURL(newFileURL);
        uploadFile(selectedFile);
          createFileURL(selectedFile);
        } else {
          alert('This file has already been uploaded.');
        }
      } else {
        alert('Invalid file type. Please upload a valid file.');
      }
    }
    
  };

  const triggerFileUpload = () => {
    document.getElementById('input-file-upload').click();
  };


  const createFileURL = (file) => {
    const url = URL.createObjectURL(file);
    setFileURL(url);
  };

  return (
    <div className={`w-[30rem] h-96  rounded-xl shadow-lg flex flex-col justify-center items-center border-8 ${dragActive ? 'border-indigo-500' : 'border-gray-600'} border-dashed`}>
                <span className='absolute -z-50 shadow-[0_0_1000px_50px_rgba(137,74,255,1)] bottom-56 '></span>
      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="file"
          id="input-file-upload"
          style={{ display: 'none' }}
          accept=".flac,.mp3,.mp4,.mpeg,.mpga,.m4a,.ogg,.wav,.webm"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="input-file-upload"
          className={`file-upload ${dragActive ? 'drag-active' : ''}`}
          onDrop={(e) => e.preventDefault()} // Prevenir caída accidental
        >
          <div className='flex flex-col justify-center gap-5 items-center'>
            <FaCloudUploadAlt className="w-20 h-20" />
            <p>Arrastra y suelta tu archivo o da click para subirlo</p>
            <button type="button" onClick={triggerFileUpload} className='bg-gradient-to-br from-fuchsia-600 to-blue-600 to-60%' disabled={file !== null}>
              Select File
            </button>
          </div>
        </label>
      </form>
    </div>
  );
}

export default Upload;
