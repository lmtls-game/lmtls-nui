window.GetParentResourceName ??= () => location.hostname;

/**
 * Invoke nui callback.
 * @param {string} name
 * @param {any} [body]
 * @returns {Promise<any>}
 */
function invokeNuiCallback(name, body) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };
    if (body) {
        options["body"] = JSON.stringify(body);
    }
    return fetch(`https://${GetParentResourceName()}/${name}`, options).then(r => r.json());
}
