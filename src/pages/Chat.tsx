import Header from '../components/Header';
import UserChat from '../components/Chat/UserChat';

function Chat() {
  return (
    <div
      id="chat-page-wrapper-div"
      className="w-full min-h-screen h-screen max-h-fit f-js-ic flex-col bg-secondary-150 dark:bg-Background  relative"
    >
      <div>
        <Header />
        <div className="w-full f-jc-is">
          <UserChat />
        </div>
      </div>
    </div>
  );
}

export default Chat;
