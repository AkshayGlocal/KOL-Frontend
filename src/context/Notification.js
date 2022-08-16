import { createContext,useState } from "react";

export const NotificationContext = createContext({
    Notification:0,
    setNotificationHandler:()=>{}
})

export function NotificationProvider(props){
    const [Notification,setNotification] = useState(0);

    function setNotificationHandler(Notificationcount){
        setNotification(Notificationcount);
    }
    const context ={
        Notification:Notification,
        setNotificationHandler:setNotificationHandler
    }

    return <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>


}




