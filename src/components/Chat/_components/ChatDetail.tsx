import { defaultQues } from '../../../../data/data';
import { LogoChatIcon } from '../../../../public/icons';
import ChatBubble from './ChatBubble';
import InputChatBox from './InputChatBox';

function ChatDetail({
  SendText,
  setAudioBlob,
  audioBlob,
  SendVoice,
  fileUploadRef,
  isPending,
  selectedModel,
  setSelectedModel,
  models,
  chatList,
}: any) {
  return (
    <div className="flex  gap-y-10 w-full !max-h-[80vh]  sm:!min-h-[80vh]  lg:!min-h-screen justify-center overflow-y-auto items-center flex-col px-4  ">
      <div className="f-jc-ic  w-full  flex-col sm:max-w-lg md:max-w-2xl lg:max-w-3xl   gap-y-4 sm:gap-y-14  mt-10 sm:mt-0  ">
        <div className="w-full  f-jc-ic flex-col sm:flex-row lg:justify-normal  gap-y-4 ">
          <img src={LogoChatIcon} alt="LogoChatIcon" className="!w-13 h-13" />
          <span className=" text-center font-bold text-secondary-700 text-3xl">
            روزت بخیر
          </span>
        </div>
        <InputChatBox
          className=" hidden lg:flex  "
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
        <div className="w-full flex flex-col items-start  gap-y-5   ">
          <div className="f-jc-ie   w-full  flex-col md:flex-row-reverse md:justify-between gap-x-4 gap-y-3">
            <span className=" w-full text-secondary-600  font-semibold   ">
              نمیدونی از کجا شروع کنی؟!
            </span>
          </div>
          <div className=" w-full flex-col lg:flex-row gap-x-3  gap-y-3 f-jb-ic ">
            {defaultQues.map((item, index) => (
              <ChatBubble
                key={index}
                onClick={() => SendText(item)}
                text={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;
