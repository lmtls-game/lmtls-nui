window.GetParentResourceName ??= () => location.hostname;

const mockedNuiCallback = {};

/**
 * Invoke nui callback.
 * @param {string} name
 * @param {any} [body]
 * @returns {Promise<any>}
 */
async function invokeNuiCallback(name, body) {
    if (mockedNuiCallback[name]) {
        return mockedNuiCallback[name];
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };
    if (body) {
        options["body"] = JSON.stringify(body);
    }
    return fetch(`https://${GetParentResourceName()}/${name}`, options)
        .then(r => r.json())
        .then(r => r.value);
}
