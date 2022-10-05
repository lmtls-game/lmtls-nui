(function (win) {
    const messageHandlers = {};
    win.registerMessageHandler = function (message, handler) {
        messageHandlers[message] = handler;
    };
    win.addEventListener("message", function (event) {
        event.data ??= event.detail;

        const { message, data } = event.data;

        if (!message) {
            return;
        }

        const handler = messageHandlers[message];

        if (!handler) {
            throw new Error(`Unknown message handler ${message}.`);
        }

        handler(data);
    });
})(window);
