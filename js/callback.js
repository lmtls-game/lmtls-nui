window.GetParentResourceName ??= () => location.hostname;

/**
 * Invoke nui callback.
 * @param {string} name
 * @param {any} body
 * @returns {Promise<any>}
 */
function invokeNuiCallback(name, body) {
    return fetch(`https://${GetParentResourceName()}/${name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(body)
    }).then(r => r.json());
}
