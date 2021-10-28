(function (win) {
    const messageHandlers = {};
    win.registerMessageHandler = function (message, handler) {
        messageHandlers[message] = handler;
    };
    win.addEventListener("message", function (event) {
        event.data ??= event.detail;

        const { message, data } = event.data;

        const handler = messageHandlers[message];

        if (!handler) {
            throw new Error("Unknown message handler");
        }

        handler(data);
    });
})(window);
