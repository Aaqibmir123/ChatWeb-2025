'use client'
import { useParams } from "next/navigation";
import ChatContainer from "../ChatContainer"

const GroupChatPage = () => {
  const params = useParams();
  const groupId = params.id;

  return (
    <div>
      <ChatContainer groupId={groupId} />
    </div>
  );
};

export default GroupChatPage;
