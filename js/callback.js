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
        return typeof mockedNuiCallback[name] === "function" ? mockedNuiCallback[name]() : mockedNuiCallback[name];
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

function mockNuiCallbacks(name) {
    if (!mockedNuiCallback["nui-callbacks"]) {
        mockedNuiCallback["nui-callbacks"] = [];
    }
    mockedNuiCallback["nui-callbacks"].push({ name });
}

async function constructNuiCallbacksInstance()
{
    const nuiInstance = {};
    const callbacks = await invokeNuiCallback("nui-callbacks");
    for (const callback of callbacks) {
        const name = callback.name;
        nuiInstance[name] = async (body) => {
            return invokeNuiCallback(name, body);
        };
    }
    return nuiInstance;
}
