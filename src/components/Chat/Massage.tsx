import { AudioVisualizer } from 'react-audio-visualize';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from 'primereact/button';
import { CopyIcon, PauseIcon, PlayIcon, TickIcon } from '../../../public/icons';

function Massage({ chat }: any) {
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audio, setAudio] = useState<any>();
  const [clickCopy, setClickCopy] = useState(new Map());

  const lastYaraBotIndex = chat
    ?.map((e: any, idx: number) => (e.role !== 'user' ? idx : -1))
    .filter((idx: number) => idx !== -1)
    .pop();

  const handlePlay = (e: any, audioId: any) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const audioData = event?.target?.result;
      const newAudio = new Audio(String(audioData));
      setAudio(newAudio);

      newAudio.onended = () => {
        setPlayingAudioId(null);
      };
      newAudio.play();
      setPlayingAudioId(audioId);
    };

    reader.readAsDataURL(e);
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      setPlayingAudioId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="overflow-y-auto  !pb-24 md:pb-0 lg:mt-6 xl:!mt-[-100px] !min-h-[85vh] flex w-full md:!w-5/6 lg:!w-4/6 xl:!w-3/6 flex-col gap-6 py-4 px-2 font-normal leading-8 [&::-webkit-scrollbar]:w-0">
      {chat?.map((item: any, idx: any) => {
        const isLastItem = idx === lastYaraBotIndex;

        if (item?.role === 'user') {
          if (typeof item?.content === 'object') {
            return (
              <div key={idx} className="flex items-center gap-x-3 pr-2">
                <AudioVisualizer
                  blob={item?.content}
                  barWidth={1}
                  width={200}
                  height={50}
                  gap={2}
                  barColor={'#2C9179'}
                />
                <div className="flex items-center justify-center">
                  {playingAudioId === item?.content ? (
                    <button
                      onClick={handleStop}
                      className="flex bg-white p-2.5 rounded-full"
                    >
                      <img
                        src={PauseIcon}
                        alt="PlayIcon"
                        className="!min-w-5 !max-w-5   "
                        style={
                          {
                            // color: '#717174',
                          }
                        }
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlay(item?.content, item?.content)}
                      className="flex bg-white p-2.5 rounded-full"
                    >
                      <img
                        src={PlayIcon}
                        alt="PlayIcon"
                        className="!min-w-5 !max-w-5 "
                        style={{
                          color: '#717174',
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                className="p-2 max-w-[90%] xl:max-w-[80%] md:max-w-[70%] flex items-center gap-3"
              >
                <span className="text-secondary-700 text-lg">
                  {item?.content}
                </span>
              </div>
            );
          }
        } else {
          if (isLastItem) {
            return (
              <div
                key={idx}
                className="w-full relative flex flex-col justify-end items-end gap-y-2"
              >
                <div className="bg-white rounded-lg dark:!bg-secondary-150 flex justify-start p-3 max-w-[69%] xl:max-w-[80%] md:max-w-[70%]">
                  <span className="text-secondary-700 text-lg">
                    {typeof item?.content === 'object' ? (
                      item?.content
                    ) : (
                      <ReactMarkdown>{item?.content}</ReactMarkdown>
                    )}
                  </span>
                </div>
                <div className="absolute -bottom-12">
                  <Button
                    onClick={() => {
                      setClickCopy(new Map(clickCopy.set(item?.content, true)));
                      copyToClipboard(item?.content);
                      setTimeout(
                        () =>
                          setClickCopy(
                            new Map(clickCopy.set(item?.content, false))
                          ),
                        700
                      );
                    }}
                    className="bg-white hover:!bg-white hover:dark:!bg-secondary-150 rounded-lg dark:!bg-secondary-150 p-0 h-11 !w-11 flex justify-center shadow-none border-0"
                  >
                    {clickCopy.get(item.content) ? (
                      <img
                        src={TickIcon}
                        className="!min-w-5 !max-w-5 "
                        alt=""
                      />
                    ) : (
                      <img
                        src={CopyIcon}
                        className="!min-w-5 !max-w-5 "
                        alt=""
                      />
                    )}
                  </Button>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                className="w-full group relative flex flex-col justify-end items-end gap-y-2"
              >
                <div className="bg-white rounded-lg dark:!bg-secondary-150 flex justify-start p-3 max-w-[69%] xl:max-w-[80%] md:max-w-[70%]">
                  <span className="text-secondary-700 text-lg">
                    {typeof item?.content === 'object' ? (
                      item?.content
                    ) : (
                      <ReactMarkdown>{item?.content}</ReactMarkdown>
                    )}
                  </span>
                </div>
                <div
                  id="hover"
                  className="absolute pt-2 -bottom-12 hover:flex w-1/2 justify-end"
                >
                  <Button
                    onClick={() => {
                      setClickCopy(new Map(clickCopy.set(item?.content, true)));
                      copyToClipboard(item?.content);
                      setTimeout(
                        () =>
                          setClickCopy(
                            new Map(clickCopy.set(item?.content, false))
                          ),
                        700
                      );
                    }}
                    className="bg-white hover:!bg-white hover:dark:!bg-secondary-150 rounded-lg dark:!bg-secondary-150 p-0 h-11 !w-11 flex justify-center shadow-none border-0"
                  >
                    {clickCopy.get(item.content) ? (
                      <img
                        src={TickIcon}
                        className="!min-w-5 !max-w-5 "
                        alt=""
                      />
                    ) : (
                      <img
                        src={CopyIcon}
                        className="!min-w-5 !max-w-5 "
                        alt=""
                      />
                    )}
                  </Button>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default Massage;
