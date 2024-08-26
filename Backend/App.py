import os
import io
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()
AI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI()


@app.route('/', methods=['POST'])
def transcribe_audio(): 
    if 'audio' not in request.files:
        return 'No se recibió ningún archivo', 400
    if 'audio' in request.files:
        inputFile = request.files.get('audio')

    audio_bytes = io.BytesIO(inputFile.read())
    audio_bytes.name = inputFile.filename  # Especifica el nombre del archivo

    transcribed = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_bytes
  )
    
    responseJson = {
        'result': 'ok',
        'transcription': transcribed.text
    }
        
    return jsonify(responseJson)

if __name__ == '__main__':
    app.run(debug=True)