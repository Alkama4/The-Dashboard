import { createApp } from "vue";
import Notification from "../components/NotificationPopup.vue";

let activeNotification = null; // Global reference to the active notification

export function notify(message, type = "info", duration = 5000) {
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
        type,
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
