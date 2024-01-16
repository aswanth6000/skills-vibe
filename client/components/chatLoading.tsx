"use clinet"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ChatLoading = () => {
  return (
    <div>
<Skeleton count={5} /> 
    </div>
  );
};

export default ChatLoading;