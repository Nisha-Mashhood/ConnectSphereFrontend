import { useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { setupInterceptors } from "./lib/axios";
import { useEffect } from "react";
import { useReviewModalTimer } from "./Service/useReviewModalTimer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ReviewModal from "./Components/Forms/ReviewModal";
import { setIsInChatComponent } from "./redux/Slice/notificationSlice";
import IncomingCallBar from "./Components/User/Home/IncomingCallBar";
import GlobalCallListener from "./Components/User/Home/GlobalCallListener";
import GlobalRingtone from "./Components/User/Home/GlobalRingtone";
import GlobalGroupCallListener from "./Components/User/Common/Chat/GlobalGroupCallListener";
import { clearIncomingCall, clearIncomingGroupCall } from "./redux/Slice/callSlice";
import SocketHandler from "./Components/User/Home/SocketHandler";
import GlobalGroupCallOverlay from "./Components/User/Common/Chat/Groups/GlobalGroupCallOverlay";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser, needsReviewPrompt } = useSelector((state: RootState) => state.user);
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { isModalOpen, setIsModalOpen } = useReviewModalTimer(needsReviewPrompt, isAdminRoute);

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  useEffect(() => {
    const isChatRoute = location.pathname.startsWith("/chat");
    dispatch(setIsInChatComponent(isChatRoute));
  }, [dispatch, location.pathname]);

  useEffect(() => {
  dispatch(clearIncomingCall());
  dispatch(clearIncomingGroupCall());
}, [dispatch]);

  return (
    <>
      <SocketHandler />
        <GlobalCallListener />
        <GlobalGroupCallListener /> 
          <GlobalGroupCallOverlay /> 
            <GlobalRingtone /> 
              <IncomingCallBar />
                {isAdminRoute ? <AdminRoutes /> : <UserRoutes />}
    
              {currentUser && !isAdminRoute && (
                <ReviewModal
                  isOpen={isModalOpen}
                  userId={currentUser._id}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            <Toaster />
    </>
  );
}

export default App;
