import React, { useEffect, useRef, useState } from 'react';

import { defaultQues } from '../../../data/data.ts';
import { useToast } from '../../context/ToastProvider.tsx';
import { AgentHistory, AgentName } from '../../services/ChatApi.ts';
import ChatDetail from './_components/ChatDetail.tsx';
import InputChatBox from './_components/InputChatBox.tsx';
import Thinking from './_components/Thinking.tsx';
import Message from './Massage.tsx';

// interface UserChatProps {
//   username: string;
// }

const UserChat: React.FC = () => {
  const [chatList, setChatList] = useState<any[]>([]);
  const [renderedItems, setRenderedItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioBlob, setAudioBlob] = useState<any>();
  const fileUploadRef = useRef<File>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<any>(null);
  const [models, setModels] = useState<any>();
  const [isUserScrolledUp, setIsUserScrolledUp] = useState<boolean>(false);
  const divRef = useRef<any>();
  const [selectedModel, setSelectedModel] = useState<any>({
    agent_id: null,
    name: 'یارابات',
  });
  let userScrolledUp = false;

  const { showToast } = useToast();
  const API = import.meta.env.VITE_BASE_URL;
  const AgentId = import.meta.env.VITE_BASE_AGENT_ID;
  const AgentToken = import.meta.env.VITE_BASE_AGENT_TOKEN;
  const history = import.meta.env.VITE_BASE_HISTORY_SAVING;

  const abortControllerRef = useRef<AbortController | null>(null);

  abortControllerRef.current = new AbortController();
  const { signal } = abortControllerRef.current;

  const handleCancelAndNavigate = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const GetHistory = async () => {
    const data = await AgentHistory(localStorage?.getItem('history') || '');
    setChatList(data);
  };

  useEffect(() => {
    if (history == 'true') {
      if (
        localStorage.getItem('history') &&
        localStorage.getItem('expire_date')
      ) {
        const expireDateStr = localStorage.getItem('expire_date');
        const savedTime = expireDateStr ? new Date(expireDateStr).getTime() : 0;
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (currentTime - savedTime >= twentyFourHours) {
          localStorage.removeItem('history');
          localStorage.removeItem('expire_date');
          localStorage.removeItem('preferences');
        } else {
          setSessionId(localStorage?.getItem('history'));
          GetHistory();
        }
      }
    } else if (history != 'false') {
      showToast(
        'error',
        'خطا',
        'مقدار VITE_BASE_HISTORY_SAVING صحیح نیست باید true یا false باشد'
      );
    }
  }, [history]);

  useEffect(() => {
    if (
      (localStorage.getItem('history') ||
        localStorage.getItem('preferences')) &&
      localStorage.getItem('expire_date')
    ) {
      const expireDateStr = localStorage.getItem('expire_date');
      const savedTime = expireDateStr ? new Date(expireDateStr).getTime() : 0;
      const currentTime = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (currentTime - savedTime >= twentyFourHours) {
        localStorage.removeItem('history');
        localStorage.removeItem('expire_date');
        localStorage.removeItem('preferences');
        AgentName()
          .then((e) => {
            if (e?.detail) {
              showToast('error', 'خطا', 'همیار مورد نظر یافت نشد');
              setModels([{ agent_id: null, name: 'یارابات' }]);
            } else {
              setModels([
                { agent_id: AgentId, name: e?.name },
                { agent_id: null, name: 'یارابات' },
              ]);
              setSelectedModel({ agent_id: AgentId, name: e?.name });
            }
          })
          .catch(() => {
            showToast('error', 'خطا', 'همیار مورد نظر یافت نشد');
            setModels([{ agent_id: null, name: 'یارابات' }]);
          });
      } else {
        const prefString = localStorage.getItem('preferences');
        const data = prefString ? JSON.parse(prefString) : null;
        setModels([
          {
            agent_id: AgentId,
            name: data?.name,
          },
          { agent_id: null, name: 'یارابات' },
        ]);
        setSelectedModel({
          agent_id: AgentId,
          name: data?.name,
        });
      }
    } else {
      if (!localStorage.getItem('preferences')) {
        AgentName()
          .then((e) => {
            if (e?.detail) {
              showToast('error', 'خطا', 'همیار مورد نظر یافت نشد');
              setModels([{ agent_id: null, name: 'یارابات' }]);
            } else {
              setModels([
                { agent_id: AgentId, name: e?.name },
                { agent_id: null, name: 'یارابات' },
              ]);
              setSelectedModel({ agent_id: AgentId, name: e?.name });
            }
          })
          .catch(() => {
            showToast('error', 'خطا', 'همیار مورد نظر یافت نشد');
            setModels([{ agent_id: null, name: 'یارابات' }]);
          });
      }
    }
  }, [localStorage]);

  // useEffect(() => {}, [AgentId, AgentToken]);

  // useEffect(() => {
  //   if (saveHistory) {
  //     console.log(chatList);
  //     console.log(JSON.stringify(chatList));
  //     localStorage.setItem('history', JSON.stringify(chatList));
  //     localStorage.setItem('expire_date', Date().toString());
  //   }
  // }, [chatList]);

  useEffect(() => {
    handleCancelAndNavigate();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (currentIndex < defaultQues.length) {
      const timer = setTimeout(() => {
        setRenderedItems((prev) => [...prev, defaultQues[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [renderedItems, defaultQues]);

  const scrollToBottom = () => {
    const { current } = divRef;
    if (!current) return;

    const checkScrollDirection = (event: any) => {
      if (event.deltaY < 0) {
        userScrolledUp = true;
        setIsUserScrolledUp(true);
        current.removeEventListener('wheel', checkScrollDirection);
      }
    };

    current.addEventListener('wheel', checkScrollDirection);

    if (!userScrolledUp && current.lastElementChild) {
      const offset = 500;
      current.scrollTo({
        top: current.lastElementChild.offsetTop + offset,
        behavior: 'smooth',
      });
    }
  };

  const fetchStreamedResponse = async ({ newText, fileType = 'text' }: any) => {
    setIsPending(true);
    setIsUserScrolledUp(false);
    let data = null;
    const form = new FormData();

    if (fileType === 'text') {
      data = new URLSearchParams({
        type: 'text',
        text: newText,
      });
    }
    if (fileType === 'voice') {
      form.append('type', 'voice');
      form.append('file', audioBlob);
    }

    try {
      const response = await fetch(
        `${API}agent/bot/${AgentId}/${
          selectedModel?.agent_id ? 'chat' : 'yarachat'
        }`,
        {
          method: 'POST',
          headers: {
            authorization: `${AgentToken}`,
          },
          body: data ? data : form,
          signal,
        }
      );
      if (response?.status === 404) {
        showToast('error', 'خطا', 'همیار مورد نظر یافت نشد!');
        setChatList((prevChatList: any) => {
          const updatedChat = [...prevChatList];
          const lastIndex = updatedChat.length - 1;

          if (lastIndex >= 0) {
            updatedChat.splice(lastIndex, 1);
          }

          return updatedChat;
        });
      }

      if (response?.status === 400) {
        showToast(
          'error',
          'خطا',
          'بسته شما قابلیت استفاده از سرویس صوتی را پشتیبانی نمیکنه.'
        );
        setChatList((prevChatList: any) => {
          const updatedChat = [...prevChatList];
          const lastIndex = updatedChat.length - 1;

          if (lastIndex >= 0) {
            updatedChat.splice(lastIndex, 1);
          }

          return updatedChat;
        });
      }

      if (!response.body) {
        console.error('No response body!');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let isFirstChunk = true;
      let text = '';
      let Id: null = null;

      while (true) {
        if (!isUserScrolledUp) {
          scrollToBottom();
        }
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let boundary = buffer.indexOf('}\n');
        while (boundary !== -1) {
          if (!isUserScrolledUp) {
            scrollToBottom();
          }
          const jsonStr = buffer.slice(0, boundary + 1);
          buffer = buffer.slice(boundary + 1);

          try {
            const parsed = JSON.parse(jsonStr);

            if (isFirstChunk) {
              isFirstChunk = false;
            }

            if (parsed?.session_id) {
              setSessionId(parsed?.session_id);
              localStorage.setItem(
                'expire_date',
                new Date(Date.now() - 25 * 60 * 60 * 1000).toString()
              );
              localStorage.setItem('history', parsed?.session_id);
            }

            if (parsed?.message_id) {
              Id = parsed?.message_id;
              setChatList((prevChatList) => {
                const updatedChat = [...prevChatList];
                const lastIndex = updatedChat.length - 1;

                const newText = updatedChat[lastIndex].content;

                updatedChat[lastIndex] = {
                  ...updatedChat[lastIndex],
                  role: 'assistant',
                  content: newText,
                  id: Id,
                  like: null,
                };

                return updatedChat;
              });
              setIsPending(false);
            }

            if (parsed.data) {
              setChatList((prevChatList) => {
                const updatedChat = [...prevChatList];
                const lastIndex = updatedChat.length - 1;
                text += parsed.data;

                updatedChat[lastIndex] = {
                  ...updatedChat[lastIndex],
                  role: 'assistant',
                  content: text,
                };

                return updatedChat;
              });
            }
          } catch (error) {
            const err = error as Error; // Type assertion
            showToast('error', 'خطا', err.message);

            console.error('Error parsing JSON:', jsonStr, error);
          }

          boundary = buffer.indexOf('}\n');
        }
        if (!isUserScrolledUp) {
          scrollToBottom();
        }
      }
      setIsPending(false);
    } catch (error) {
      const err = error as Error; // Type assertion
      showToast('error', 'خطا', err.message);

      // console.log('Error in New Chat:', error);
    }
    setIsUserScrolledUp(false);
    // if (saveHistory) {
    //   console.log(chatList);
    //   console.log(chatList.toString());

    //   localStorage.setItem('history', chatList.toString());
    //   localStorage.setItem('expire_date', Date().toString());
    // }
  };

  const ContinueChat = async ({ newText, fileType = 'text' }: any) => {
    setIsPending(true);
    setIsUserScrolledUp(false);
    let data = null;
    const form = new FormData();

    if (fileType === 'text') {
      data = new URLSearchParams({
        type: 'text',
        text: newText,
        session_id: sessionId,
      });
    }
    if (fileType === 'voice') {
      form.append('type', 'voice');
      form.append('file', audioBlob);
      form.append('session_id', sessionId);
    }

    try {
      const response = await fetch(
        `${API}agent/bot/${AgentId}/${
          selectedModel?.agent_id ? 'chat' : 'yarachat'
        }`,
        {
          method: 'POST',
          headers: {
            authorization: `${AgentToken}`,
          },
          body: data ? data : form,
        }
      );

      if (response?.status === 404) {
        showToast('error', 'خطا', 'همیار مورد نظر یافت نشد!');
        setChatList((prevChatList: any) => {
          const updatedChat = [...prevChatList];
          const lastIndex = updatedChat.length - 1;

          if (lastIndex >= 0) {
            updatedChat.splice(lastIndex, 1);
          }

          return updatedChat;
        });
      }

      if (response?.status === 400) {
        showToast(
          'error',
          'خطا',
          'بسته شما قابلیت استفاده از سرویس صوتی را پشتیبانی نمیکنه.'
        );
        setChatList((prevChatList: any) => {
          const updatedChat = [...prevChatList];
          const lastIndex = updatedChat.length - 1;

          if (lastIndex >= 0) {
            updatedChat.splice(lastIndex, 1);
          }

          return updatedChat;
        });
      }

      if (!response.body) {
        console.error('No response body!');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let text = '';
      let Id: null = null;

      while (true) {
        if (!isUserScrolledUp) {
          scrollToBottom();
        }
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let boundary = buffer.indexOf('}\n');
        while (boundary !== -1) {
          if (!isUserScrolledUp) {
            scrollToBottom();
          }
          const jsonStr = buffer.slice(0, boundary + 1);
          buffer = buffer.slice(boundary + 1);

          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed?.message_id) {
              Id = parsed?.message_id;
              setChatList((prevChatList) => {
                const updatedChat = [...prevChatList];
                const lastIndex = updatedChat.length - 1;

                const newText = updatedChat[lastIndex].content;

                updatedChat[lastIndex] = {
                  ...updatedChat[lastIndex],
                  role: 'assistant',
                  content: newText,
                  id: Id,
                  like: null,
                };

                return updatedChat;
              });
              setIsPending(false);
            }

            if (parsed.data) {
              setChatList((prevChatList) => {
                const updatedChat = [...prevChatList];
                const lastIndex = updatedChat.length - 1;
                text += parsed.data;

                updatedChat[lastIndex] = {
                  ...updatedChat[lastIndex],
                  role: 'assistant',
                  content: text,
                };

                return updatedChat;
              });
            }
          } catch (error) {
            const err = error as Error; // Type assertion
            showToast('error', 'خطا', err.message);

            console.error('Error parsing JSON:', jsonStr, error);
          }

          boundary = buffer.indexOf('}\n');
        }
        if (!isUserScrolledUp) {
          scrollToBottom();
        }
      }
      text = '';
      setIsPending(false);
    } catch (error) {
      const err = error as Error; // Type assertion
      showToast('error', 'خطا', err.message);

      // console.log('Error in fetchStreamedResponse:', error);
    }
    setIsUserScrolledUp(false);
    // if (saveHistory) {
    //   console.log(chatList);
    //   console.log(chatList.toString());
    //   localStorage.setItem('history', chatList.toString());
    //   localStorage.setItem('expire_date', Date().toString());
    // }
  };

  const SendText = async (newText: string) => {
    if (newText.trim() !== '') {
      setChatList((prevChatList) => {
        const _newChat = [...prevChatList];
        _newChat.push({
          content: newText,
          file: [],
          role: 'user',
          timestamp_ms: Date.now(),
        });
        _newChat.push({
          content: <Thinking />,
          file: [],
          role: 'assistant',
          timestamp_ms: Date.now(),
          like: null,
        });
        return _newChat;
      });
      setTimeout(() => {
        scrollToBottom();
      }, 100);
      if (chatList.length >= 2) {
        if (audioBlob) {
          await ContinueChat({
            newText: newText,
            fileType: 'voice',
          });
        } else {
          await ContinueChat({ newText: newText });
        }
      } else {
        if (audioBlob) {
          await fetchStreamedResponse({ newText: newText, fileType: 'voice' });
        } else {
          await fetchStreamedResponse({ newText: newText });
        }
      }
    }
  };

  const SendVoice = async () => {
    setAudioBlob('');
    setChatList((prevChatList) => {
      const _newChat = [...prevChatList];
      _newChat.push({
        content: audioBlob,
        role: 'user',
        timestamp_ms: Date.now(),
      });
      _newChat.push({
        content: <Thinking />,
        file: [],
        role: 'assistant',
        timestamp_ms: Date.now(),
        like: null,
      });
      return _newChat;
    });
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    if (chatList.length >= 2) {
      await ContinueChat({
        fileType: 'voice',
      });
    } else {
      await fetchStreamedResponse({ fileType: 'voice' });
    }
    setAudioBlob('');
  };

  return (
    <div
      className={`flex-col f-jc-ic !w-screen !max-h-[calc(100vh-100px)] overflow-hidden justify-between items-center lg:justify-center ${
        chatList.length <= 0 ? 'lg:flex-row' : 'lg:flex-col xl:pt-[200px]'
      }`}
    >
      <div className="flex !w-full pb-0 md:!pb-24 justify-center items-center flex-col min-h-[calc(90vh-15px)] px-3 lg:max-h-screen  ">
        {chatList.length <= 0 ? (
          <>
            <ChatDetail
              SendText={SendText}
              setAudioBlob={setAudioBlob}
              audioBlob={audioBlob}
              SendVoice={SendVoice}
              fileUploadRef={fileUploadRef}
              isPending={isPending}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              models={models}
              chatList={chatList}
            />
            <InputChatBox
              className="lg:hidden !h-auto w-[95%] mb-2 !absolute !bottom-0"
              SendText={SendText}
              setAudioBlob={setAudioBlob}
              audioBlob={audioBlob}
              SendVoice={SendVoice}
              fileUploadRef={fileUploadRef}
              isPending={isPending}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              models={models}
              chatList={chatList}
            />
          </>
        ) : (
          <>
            <Message chat={chatList} sessionId={sessionId} divRef={divRef} />
            <InputChatBox
              className="lg:w-4/6 xl:!w-3/6 md:w-5/6 w-[95%] mb-2 !absolute !bottom-0 !h-auto"
              SendText={SendText}
              setAudioBlob={setAudioBlob}
              audioBlob={audioBlob}
              SendVoice={SendVoice}
              fileUploadRef={fileUploadRef}
              isPending={isPending}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              models={models}
              chatList={chatList}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserChat;
