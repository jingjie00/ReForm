import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Aos from "aos";
import LoadingModal from "../dialog/LoadingModal";
import AlertModal from "../dialog/AlertModal";
import { SettingActions } from "../reducers/settingReducer";

function Layout(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.setting.loading);
  const isAlert = useSelector((state) => state.setting.alert);
  const isChatbotOpen = useSelector((state) => state.setting.isChatbotOpen);
  const isLogin = useSelector((state) => state.setting.isLogin);
  const userInputLatest = useSelector((state) => state.setting.userInputLatest);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(userInputLatest);
  }, [userInputLatest]);

  useEffect(() => {
    Aos.init();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const middleMenu = [
    {
      key: 0,
      label: "Home",
      action: () => {
        dispatch(SettingActions.setLoading(true));
        router.push("/");
      },
    },
    {
      key: 1,
      label: "Dashboard",
      action: async () => {
        await navigator.clipboard.writeText("RM50000 for brain diseases");
        dispatch(SettingActions.setLoading(true));
        router.push("/dashboard");
      },
    },
    {
      key: 2,
      label: "Request",
      action: () => {
        dispatch(SettingActions.setLoading(true));
        router.push("/request");
      },
    },
    {
      key: 3,
      label: "Request List",
      action: () => {
        dispatch(SettingActions.setLoading(true));
        router.push("/request");
      },
    },
  ];

  const renderMenu = () => {
    if (!menuOpen) return null;
    return (
      <div className="absolute left-0 top-16 bg-white shadow-lg rounded-lg w-48 z-50 border border-gray-300">
        <ul className="flex flex-col">
          {middleMenu.map(item => (
            <li key={item.key}>
              <button
                onClick={item.action}
                className="block px-4 py-2 hover:bg-gray-100 transition duration-200 ease-in-out w-full text-left font-semibold"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <div className="relative h-full w-full text-gray-800 bg-gray-100">
          <div id="page-container" className="h-full overflow-y-auto hidden-scrollbar">
            <div id="pageHeader" className="z-50 bg-white pb-3 pt-3 px-5 flex justify-between items-center shadow-lg rounded-b-lg">
              <MenuOutlined
                onClick={toggleMenu}
                style={{ fontSize: "32px", color: "#1B57F0" }}
                className="cursor-pointer hover:text-blue-600 transition duration-200"
              />
              <img
                alt="EvestAI Logo"
                className="h-12 cursor-pointer"
                onClick={() => {
                  dispatch(SettingActions.setLoading(true));
                  router.push("/");
                  dispatch(SettingActions.setSelected(null));
                  dispatch(SettingActions.setLoading(false));
                }}
                src="/images/logo.png"
              />
              <div className="flex items-center justify-end space-x-4"> {/* Added space between icons */}
                {isLogin && (
                  <UserOutlined
                    style={{ fontSize: "32px", color: "#1B57F0" }}
                    className="pt-1 cursor-default transition duration-200 hover:text-blue-600"
                  />
                )}
                <UserOutlined // Profile icon added
                  style={{ fontSize: "32px", color: "#1B57F0" }}
                  className="pt-1 cursor-default transition duration-200 hover:text-blue-600"
                />
              </div>
            </div>

            {renderMenu()}

            <div className="relative container mx-auto h-full">
              <div className="mb-auto h-full flex">
                <div className={`${isChatbotOpen ? "w-9/12" : "w-full"} h-full px-4`}>
                  <div className="games-container h-full">
                    <div className="relative h-full">{props.children}</div>
                  </div>
                </div>
                {isChatbotOpen && (
                  <div className="shadow-2xl shadow-gray-500 w-3/12 bg-white text-white transition-opacity duration-500 ease-in-out" id="chatbot-region">
                    <div className="col-span-3 w-full h-full">
                      <div className="w-full h-full">
                        <Chatbot
                          config={selectedConfigLocal}
                          actionProvider={ActionProvider}
                          messageParser={MessageParser}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <div className="text-white">
        {isLoading && <LoadingModal />}
        {isAlert.length > 0 && <AlertModal message={isAlert[0]?.msg} action={isAlert[1]} />}
      </div>
    </>
  );
}

export default Layout;
