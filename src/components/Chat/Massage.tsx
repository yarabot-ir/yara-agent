import { Button } from 'primereact/button';
import { useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import ReactMarkdown from 'react-markdown';
import { PauseIcon, PlayIcon } from '../../../public/icons';
import CopyIcon from '../../../public/icons/CopyIcon';
import TickIcon from '../../../public/icons/TickIcon';
import { ReactMessage } from '../../services/ChatApi';

function Massage({ chat, sessionId, divRef }: any) {
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audio, setAudio] = useState<any>();
  const [clickCopy, setClickCopy] = useState(new Map());
  const [like, setLike] = useState(new Map());

  const prefString = localStorage.getItem('preferences');
  const preferences = prefString ? JSON.parse(prefString) : null;
  const color = preferences?.header_color || '#77777E';
  // const AgenttextColor = preferences?.agent_text_response_color;

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
    <div
      ref={divRef}
      className="overflow-y-auto  !pb-36 md:pb-0 lg:mt-6 xl:!mt-[-100px] !min-h-[85vh] flex w-full md:!w-5/6 lg:!w-4/6 xl:!w-3/6 flex-col gap-6 py-4 px-2 font-normal leading-8 [&::-webkit-scrollbar]:w-0"
    >
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
                <div className="  py-4  absolute -bottom-16 flex gap-x-1">
                  {(item?.like === undefined || item?.like === null) &&
                  like.get(item?.id) == undefined ? (
                    <>
                      <Button
                        onClick={() => {
                          ReactMessage(sessionId, item?.id, false).then(
                            (e: any) => {
                              if (e?.status) {
                                const newLike = new Map(like);
                                newLike.set(item?.id, 'Dislike');
                                setLike(newLike);
                              }
                            }
                          );
                        }}
                        className={`bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0`}
                      >
                        {(item && item?.like === false) ||
                        like.get(item?.id) === 'Dislike' ? (
                          <i
                            className="pi pi-thumbs-down-fill"
                            style={{
                              color: color,
                            }}
                          ></i>
                        ) : (
                          <i
                            className="pi pi-thumbs-down"
                            style={{
                              color: color,
                            }}
                          ></i>
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          ReactMessage(sessionId, item?.id, true).then(
                            (e: any) => {
                              if (e?.status) {
                                const newLike = new Map(like);
                                newLike.set(item?.id, 'like');
                                setLike(newLike);
                              }
                            }
                          );
                        }}
                        className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0"
                      >
                        {(item && item?.like === false) ||
                        like.get(item?.id) === 'like' ? (
                          <i
                            className="pi pi-thumbs-up-fill"
                            style={{
                              color: color,
                            }}
                          ></i>
                        ) : (
                          <i
                            className="pi pi-thumbs-up"
                            style={{
                              color: color,
                            }}
                          ></i>
                        )}
                      </Button>
                    </>
                  ) : item?.like || like.get(item?.id) === 'like' ? (
                    <Button className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0">
                      <i
                        className="pi pi-thumbs-up-fill"
                        style={{
                          color: color,
                        }}
                      ></i>
                    </Button>
                  ) : (
                    <Button className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0">
                      <i
                        className="pi pi-thumbs-down-fill"
                        style={{
                          color: color,
                        }}
                      ></i>
                    </Button>
                  )}
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
                    className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0"
                  >
                    {clickCopy.get(item.content) ? (
                      <TickIcon color={color} />
                    ) : (
                      <CopyIcon color={color} />
                      // '#77777E'
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
                <div className="  py-4  absolute -bottom-16 flex gap-x-1">
                  {(item?.like === undefined || item?.like === null) &&
                  like.get(item?.id) == undefined ? (
                    <>
                      <Button
                        onClick={() => {
                          ReactMessage(sessionId, item?.id, false).then(
                            (e: any) => {
                              if (e?.status) {
                                const newLike = new Map(like);
                                newLike.set(item?.id, 'Dislike');
                                setLike(newLike);
                              }
                            }
                          );
                        }}
                        className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0"
                      >
                        {(item && item?.like === false) ||
                        like.get(item?.id) === 'Dislike' ? (
                          <i
                            className="pi pi-thumbs-down-fill"
                            style={{
                              color: color,
                            }}
                          ></i>
                        ) : (
                          <i
                            className="pi pi-thumbs-down"
                            style={{
                              color: color,
                            }}
                          ></i>
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          ReactMessage(sessionId, item?.id, true).then(
                            (e: any) => {
                              if (e?.status) {
                                const newLike = new Map(like);
                                newLike.set(item?.id, 'like');
                                setLike(newLike);
                              }
                            }
                          );
                        }}
                        className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0"
                      >
                        {(item && item?.like === false) ||
                        like.get(item?.id) === 'like' ? (
                          <i
                            className="pi pi-thumbs-up-fill"
                            style={{
                              color: color,
                            }}
                          ></i>
                        ) : (
                          <i
                            className="pi pi-thumbs-up"
                            style={{
                              color: color,
                            }}
                          ></i>
                        )}
                      </Button>
                    </>
                  ) : item?.like || like.get(item?.id) === 'like' ? (
                    <Button className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0">
                      <i
                        className="pi pi-thumbs-up-fill"
                        style={{
                          color: color,
                        }}
                      ></i>
                    </Button>
                  ) : (
                    <Button className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0">
                      <i
                        className="pi pi-thumbs-down-fill"
                        style={{
                          color: color,
                        }}
                      ></i>
                    </Button>
                  )}
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
                    className="bg-white hover:!bg-white hover:dark:!bg-white/25 rounded-lg dark:!bg-secondary-150 !p-0 !h-8 !w-8 flex justify-center shadow-none border-0"
                  >
                    {clickCopy.get(item.content) ? (
                      <TickIcon color={color} />
                    ) : (
                      <CopyIcon color={color} />
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
