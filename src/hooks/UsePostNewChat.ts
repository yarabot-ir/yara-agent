import { useMutation } from '@tanstack/react-query';
import { postNewChat } from '../services/ChatService';

function UsePostNewChat(handleSuccess: any) {
  const {
    mutateAsync: postNewChatFn,
    isSuccess: isSuccessPostNewChat,
    error: postNewChatError,
    isPending: isPendingPostNewChat,
    data: responseData,
  } = useMutation({
    mutationKey: ['postRegisterPhone'],
    mutationFn: ({ fileType, body }: { fileType: string; body: any }) =>
        postNewChat(fileType, body), 
    onSuccess: (data) => handleSuccess(data),
  });
  return {
    postNewChatFn,
    isPendingPostNewChat,
    postNewChatError,
    isSuccessPostNewChat,
    responseData,
  };
}

export default UsePostNewChat;
