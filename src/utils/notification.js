import { createApp } from "vue";
import Notification from "@/components/common/NotificationPopup.vue";

let activeNotification = null; // Global reference to the active notification

export function notify(message, messageType = "info", duration = 5000) {
    console.debug(`[notify] {${messageType}}`, message)
    if (activeNotification) {
        // Remove the previous notification
        activeNotification.unmount();
        document.body.removeChild(activeNotification.container);
        activeNotification = null;
    }

    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp(Notification, {
        message,
        messageType,
        duration,
        onClose: () => {
            app.unmount();
            document.body.removeChild(container);
            activeNotification = null; // Clear the reference when closed
        },
    });

    app.mount(container);

    // Store the app and container reference
    activeNotification = { unmount: app.unmount, container };
}
