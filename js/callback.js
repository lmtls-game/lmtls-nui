window.GetParentResourceName ??= () => location.hostname;

const mockedNuiCallback = {};

const NUI_CALLBACKS_NAME = "nui-callbacks";

/**
 * Invoke nui callback.
 * @param {string} name
 * @param {any} [body]
 * @returns {Promise<any>}
 */
async function invokeNuiCallback(name, body) {
	if (mockedNuiCallback[name]) {
		return typeof mockedNuiCallback[name] === "function" ? mockedNuiCallback[name](body) : mockedNuiCallback[name];
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
	if (!mockedNuiCallback[NUI_CALLBACKS_NAME]) {
		mockedNuiCallback[NUI_CALLBACKS_NAME] = [];
	}
	mockedNuiCallback[NUI_CALLBACKS_NAME].push({name});
}

async function constructNuiCallbacksInstance(nuiCallbacks) {
	const nuiInstance = {};
	const callbacks = nuiCallbacks ?? await invokeNuiCallback(NUI_CALLBACKS_NAME);
	for (const callback of callbacks) {
		const name = callback;
		nuiInstance[name] = async (body) => {
			return invokeNuiCallback(name, body);
		};
	}
	return nuiInstance;
}
