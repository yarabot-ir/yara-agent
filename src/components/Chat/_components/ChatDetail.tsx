import { LogoChatIcon } from '../../../../public/icons';
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
      </div>
    </div>
  );
}

export default ChatDetail;
