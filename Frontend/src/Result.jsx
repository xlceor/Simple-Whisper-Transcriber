import { useState } from "react";
import { FaFileDownload, FaCopy } from "react-icons/fa";

const Result = ({ file, transcription}) => {
    const [name, setName] = useState("Archivo"); // Estado inicial
    

    const handleChange = (e) => {
        const newName = e.target.value;
        const validName = newName.replace(/[^a-zA-Z0-9_-]/g, ""); // Reemplaza los caracteres inválidos
        setName(validName);
      };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([transcription], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = name + ".txt";
        document.body.appendChild(element); // Requerido para Firefox
        element.click();
        document.body.removeChild(element);

    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcription).then(() => {
          alert("¡Texto copiado al portapapeles!");
        }).catch(err => {
          console.error('Error al copiar: ', err);
        });
      };


    return (
        <div className='flex w-full items-center h-full'>
            <section className='flex h-full w-full justify-center'>
                <div className="flex w-full">
                {file ? (
                    <div className=" flex w-full px-5 pb-5 items-center justify-center">
                        <div className="flex w-full h-full flex-col bg-indigo-900/45 shadow-xl">
                            <div className="w-full flex p-5 bg-gray-900/40  justify-around">
                                <div className="text-3xl flex font-bold">
                                <input
                                    type="text"
                                    className="flex bg-gray-400/50 p-2 rounded-lg w-4/5"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="Introduce el nombre del archivo"
                                />
                                    <p className=" focus-visible:bg-gray-500/50 outline-0 p-2 rounded-lg">.txt</p>
                                </div>
                                <div className="flex gap-3 w-full justify-end">
                                    <button className="flex items-center justify-center p-3 w-28 bg-indigo-700" onClick={downloadTxtFile}><FaFileDownload /></button>
                                    <button className="flex items-center justify-center p-3 w-28 bg-indigo-700" onClick={copyToClipboard}><FaCopy /></button>
                                </div>
                            </div>
                            <div className="flex w-full h-full justify-center items-center p-20">
                            <p className="text-justify">{transcription}</p>
                            </div>
                        </div>
                    </div>
                ):(<div className=" w-full h-full flex justify-center items-center"> <h1 className="text-red-600">An unespected error occurred</h1></div>)}
                </div>
            </section>
        </div>
    )
}

export default Result