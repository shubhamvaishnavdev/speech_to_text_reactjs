import React, { useState, useEffect } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import CopyText from './CopyText';



//access  SpeechRecognition from window object. run only in chrome
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const microphone = new SpeechRecognition();

// true= countinous recognition, false= return single recognition
microphone.continuous = true;
// controls whether or not interim results should be returned. The results that are not yet final are called interim results.
microphone.interimResults = true;
//  sets the language of the current SpeechRecognition interface
microphone.lang = "en-US";


const Speechbox = () => {

  const [isRecording, setisRecording] = useState(false);
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    startRecordController();
  }, [isRecording]);

  //listen to the speech and then convert the result to text
  const startRecordController = () => {
    if (isRecording) {
      microphone.start();
    } else {
      microphone.stop();
    }


    microphone.onresult = (event) => {
      let recordingResult = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          recordingResult += transcript;
        } else {
          recordingResult += transcript + ' ';
        }
      }
      setNote(recordingResult);
    };
    microphone.onerror = (event) => {
      console.log('event.error:', event.error);
    };
  };


  const handleTextAreaClick = () => {
    setIsEditing(true);
  };

  const handleTextAreaChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className='h-auto w-auto'>

        <textarea
          name=""
          id=""
          value={note}
          onChange={handleTextAreaChange}
          onClick={handleTextAreaClick}
          readOnly={!isEditing}
          className='h-[20rem] w-[22rem] p-4 text-justify bg-gray-200 text-xl'
        ></textarea>
     
      <div className=" flex flex-wrap gap-8 justify-center items-center">
        <button onClick={() => setisRecording((prevState) => !prevState)} className={`p-4 rounded-full  ${isRecording ? 'bg-red-500' : 'bg-yellow-500'}`}>
          {isRecording ? (
            <BsFillMicMuteFill />
          ) : (

            <BsFillMicFill />
          )}
        </button>
        <p className='text-white text-xl'> {isRecording ? 'listening...' : 'not listening'}</p>
       
        <CopyText note={note} />
      </div>
    </div>
  );
};

export default Speechbox; 