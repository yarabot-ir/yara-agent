import clsx from 'clsx';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { useRef, useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import { TrashIcon } from '../../../../public/icons';
import Pause from '../../../../public/icons/Pause';
import Play from '../../../../public/icons/Play';
import Send from '../../../../public/icons/Send';
import Voice from '../../../../public/icons/Voice';
import { useToast } from '../../../context/ToastProvider';

function InputChatBox({
  className,
  SendText,
  setAudioBlob,
  audioBlob,
  SendVoice,
  isPending,
  selectedModel,
  setSelectedModel,
  models,
  chatList,
}: any) {
  const [text, setText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any>([]);
  const [audio, setAudio] = useState<any>(null);
  const [play, setPlay] = useState<any>(false);
  const { showToast } = useToast();

  const prefString = localStorage.getItem('preferences');
  const preferences = prefString ? JSON.parse(prefString) : null;
  const color = preferences?.header_color || '#3AC0A0';
  const AgenttextColor = preferences?.agent_text_response_color;

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
        `lg:relative z-20 relative  f-jb-ie w-[100%] !max-w-full h-full    px-2 rounded-md gap-x-1 !border-2 dark:!border-primary-150/70 bg-white dark:!bg-secondary-150 `,
        className
      )}
      style={{
        borderColor: color,
      }}
    >
      <Dropdown
        disabled={chatList?.length >= 1 && true}
        options={models}
        value={selectedModel}
        placeholder=""
        onChange={(e) => setSelectedModel(e.value)}
        valueTemplate={(option) => option && `در حال استفاده از ${option.name}`}
        optionLabel="name"
        pt={{
          input: {
            className: '!text-sm -mt-2.5 !font-medium !font-yekanBakh',
          },
          trigger: {
            className: ' !font-yekanBakh',
          },
          item: {
            className: `!text-sm !font-medium !font-yekanBakh  h-10`,
          },
          select: {
            className: `!bg-[${color}] hover:!bg-[${color}] `,
          },
          list: {
            className: '!py-0',
          },
        }}
        className={`!absolute text-[${AgenttextColor}] opacity-85 !outline-none !shadow-none !border-0 left-7 -top-[33px] !h-8 !w-60 rounded-b-none`}
      />
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
              <Send color={color} />
            </button>
            {play ? (
              <button onClick={handleStop} className="flex">
                <Pause color={color} />
              </button>
            ) : (
              <button onClick={handlePlay} className="flex">
                {/* <img
                  src={PlayIcon}
                  alt="PlayIcon"
                  className="!min-w-5 !max-w-5"
                  style={{
                    color: color,
                  }}
                /> */}
                <Play color={color} />
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
              barColor={color}
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
              className={clsx(
                text.length !== 0 ? 'hidden' : 'rounded-full ',
                !isRecording && 'opacity-40'
              )}
              onClick={handleMicClick}
              style={{
                opacity: isPending ? '20%' : '100%',
                display: text !== '' ? 'none' : '',
                filter: !isRecording ? '' : 'bg-red-00',
              }}
            >
              <Voice color={color} />
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
              <Send color={color} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default InputChatBox;
