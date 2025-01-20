import clsx from 'clsx';
import {
  SendIcon,
  VoiceIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from '../../../../public/icons';
import { InputTextarea } from 'primereact/inputtextarea';
import { useRef, useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import { useToast } from '../../../context/ToastProvider';

function InputChatBox({
  className,
  SendText,
  setAudioBlob,
  audioBlob,
  SendVoice,
  isPending,
}: any) {
  const [text, setText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any>([]);
  const [audio, setAudio] = useState<any>(null);
  const [play, setPlay] = useState<any>(false);
  const { showToast } = useToast();

  const handleMicClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);

        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event: any) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audio = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          });
          setAudioBlob(audio);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        const err = error as Error; // Type assertion
        showToast('error', 'خطا', err.message);

        console.error('Microphone access denied:', error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleStop = () => {
    audio.pause();
    setPlay(false);
  };

  const handlePlay = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const audioData = event?.target?.result;
      const newAudio = new Audio(String(audioData));
      setAudio(newAudio);

      newAudio.onended = () => {
        setPlay(false);
      };
      newAudio.play();
      setPlay(true);
    };

    reader.readAsDataURL(audioBlob);
  };

  return (
    <div
      className={clsx(
        'lg:relative z-20 relative  f-jb-ie w-[100%] !max-w-full h-full    px-2 rounded-md gap-x-1 border-2 !border-primary-150 dark:!border-primary-150/70 bg-white dark:!bg-secondary-150    ',
        className
      )}
    >
      {audioBlob ? (
        <div className="flex justify-between items-center gap-3 px-2">
          <div className="flex gap-x-2 items-center">
            <button
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  SendVoice();
                }
              }}
              className="rotate-90"
              onClick={SendVoice}
            >
              <img src={SendIcon} className="!min-w-6 !max-w-6 " alt="" />
            </button>
            {play ? (
              <button onClick={handleStop} className="flex">
                <img
                  src={PauseIcon}
                  alt="PlayIcon"
                  className="!min-w-5 !max-w-5 filter dark:invert dark:brightness-0"
                  style={{
                    color: '#717174',
                  }}
                />
              </button>
            ) : (
              <button onClick={handlePlay} className="flex">
                <img
                  src={PlayIcon}
                  alt="PlayIcon"
                  className="!min-w-5 !max-w-5 filter dark:invert dark:brightness-0"
                  style={{
                    color: '#717174',
                  }}
                />
              </button>
            )}
          </div>
          <div>
            <AudioVisualizer
              style={{
                width: '100%',
                height: '50px',
              }}
              blob={audioBlob}
              barWidth={1}
              width={500}
              height={30}
              gap={2}
              barColor={'#2C9179'}
            />
          </div>
          <button className="flex" onClick={() => setAudioBlob('')}>
            <img
              src={TrashIcon}
              className="  !min-w-5  !max-w-5  fillRed"
              alt=""
            />
          </button>
        </div>
      ) : (
        <>
          <div className="f-js-ic gap-x-3 w-full h-full ml-2">
            {/* <button className="flex sm:hidden" onClick={handleButtonClick}>
              <img src={AttachIcon} className="!w-7" alt="" />
            </button> */}

            <InputTextarea
              autoFocus
              autoResize
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement;
                  SendText(target.value);
                  setText('');
                }
              }}
              className="flex !resize-none flex-grow max-w-full max-h-72 text-secondary-700 dark:!text-secondary-700 bg-transparent  placeholder:text-sm placeholder:text-secondary-500 min-h-fit "
              pt={{
                root: {
                  className:
                    ' -py-2 !border-transparent !bg-transparent hover:!border-transparent focus:!border-transparent   dark:!border-transparent focus:!bg-transparent focus:shadow-none ',
                },
              }}
              placeholder="شروع به نوشتن کن ..."
              rows={1}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="  min-h-full h-full max-h-full flex justify-center items-center  gap-x-2 lg:gap-x-5  mb-2 px-2  py-2.5  ">
            {/* <button className="hidden sm:flex" onClick={handleButtonClick}>
              <img src={AttachIcon} className="!w-7" alt="Attach Icon" />
            </button>
            <FileUpload
              ref={fileUploadRef}
              mode="basic"
              name="demo[]"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.txt"
              maxFileSize={100000}
              auto={false}
              chooseLabel=" "
              onSelect={handleFileSelect}
              style={{ display: 'none' }}
            /> */}

            <button
              disabled={isPending}
              className={clsx(text.length !== 0 ? 'hidden' : 'rounded-full ')}
              onClick={handleMicClick}
              style={{
                opacity: isPending ? '20%' : '100%',
                display: text !== '' ? 'none' : '',
                filter: !isRecording
                  ? 'brightness(0) saturate(100%) invert(33%) sepia(15%) saturate(676%) hue-rotate(140deg) brightness(85%) contrast(90%)'
                  : '',
              }}
            >
              <img src={VoiceIcon} className={`!min-w-6 !max-h-6 `} alt="" />
            </button>
            <button
              disabled={isPending}
              className={`${isPending && 'opacity-[50%]'}`}
              onClick={() => {
                if (text.trim() !== '') {
                  SendText(text);
                  setText('');
                }
              }}
            >
              <img src={SendIcon} className="!min-w-6 !max-w-6 " alt="" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default InputChatBox;
