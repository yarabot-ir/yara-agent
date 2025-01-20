import React, { useEffect, useRef, useState } from 'react';

import { defaultQues } from '../../../data/data.ts';
import InputChatBox from './_components/InputChatBox.tsx';
import ChatDetail from './_components/ChatDetail.tsx';
import Message from './Massage.tsx';
import Thinking from './_components/Thinking.tsx';
import { useToast } from '../../context/ToastProvider.tsx';

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

  const { showToast } = useToast();
  const API = import.meta.env.VITE_BASE_URL;
  const AgentId = import.meta.env.VITE_BASE_AGENT_ID;
  const AgentToken = import.meta.env.VITE_BASE_AGENT_TOKEN;

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleCancelAndNavigate = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

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

  const fetchStreamedResponse = async ({ newText, fileType = 'text' }: any) => {
    setIsPending(true);

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
      const response = await fetch(`${API}agent/bot/${AgentId}/chat`, {
        method: 'POST',
        headers: {
          authorization: `${AgentToken}`,
        },
        body: data ? data : form,
      });

      console.log(response);

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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let boundary = buffer.indexOf('}\n');
        while (boundary !== -1) {
          const jsonStr = buffer.slice(0, boundary + 1);
          buffer = buffer.slice(boundary + 1);

          try {
            const parsed = JSON.parse(jsonStr);

            if (isFirstChunk) {
              isFirstChunk = false;
            }

            if (parsed?.session_id) {
              setSessionId(parsed?.session_id);
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
      }
      setIsPending(false);
    } catch (error) {
      const err = error as Error; // Type assertion
      showToast('error', 'خطا', err.message);

      // console.log('Error in New Chat:', error);
    }
  };

  const ContinueChat = async ({ newText, fileType = 'text' }: any) => {
    setIsPending(true);

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
      const response = await fetch(`${API}agent/bot/${AgentId}/chat`, {
        method: 'POST',
        headers: {
          authorization: `${AgentToken}`,
        },
        body: data ? data : form,
      });

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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let boundary = buffer.indexOf('}\n');
        while (boundary !== -1) {
          const jsonStr = buffer.slice(0, boundary + 1);
          buffer = buffer.slice(boundary + 1);

          try {
            const parsed = JSON.parse(jsonStr);
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
      }
      text = '';
      setIsPending(false);
    } catch (error) {
      const err = error as Error; // Type assertion
      showToast('error', 'خطا', err.message);

      // console.log('Error in fetchStreamedResponse:', error);
    }
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
        });
        return _newChat;
      });

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
      });
      return _newChat;
    });
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
            />
            <InputChatBox
              className="lg:hidden !h-auto w-[95%] mb-2 !absolute !bottom-0"
              SendText={SendText}
              setAudioBlob={setAudioBlob}
              audioBlob={audioBlob}
              SendVoice={SendVoice}
              fileUploadRef={fileUploadRef}
              isPending={isPending}
            />
          </>
        ) : (
          <>
            <Message chat={chatList} />
            <InputChatBox
              className="lg:w-4/6 xl:!w-3/6 md:w-5/6 w-[95%] mb-2 !absolute !bottom-0 !h-auto"
              SendText={SendText}
              setAudioBlob={setAudioBlob}
              audioBlob={audioBlob}
              SendVoice={SendVoice}
              fileUploadRef={fileUploadRef}
              isPending={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserChat;
