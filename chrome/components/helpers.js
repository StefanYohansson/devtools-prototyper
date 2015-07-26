const {Ci, Cc, Cu} = require("chrome");
Cu.import("resource://gre/modules/Services.jsm");

const prefPrefix = "extensions.devtools-prototyper.";
const syncPrefPrefix = "services.sync.prefs.sync." + prefPrefix;

let Storage = {
	get: function(pref) {
		let prefname = prefPrefix + pref;
		if (!Services.prefs.getPrefType(prefname)) {
			Services.prefs.setCharPref(prefname, "");
			this.enablePrefSync(pref);
		}
		return Services.prefs.getCharPref(prefname);
	},
	set: function(pref, value) {
		Services.prefs.setCharPref(prefPrefix + pref, value);
	},
	enablePrefSync: function(pref) {
		Services.prefs.setBoolPref(syncPrefPrefix + pref, true);
	}
}
function Element(tagName, attributes, doc = document) {
	let element = doc.createElement(tagName);
	for (var attr in attributes) {
		if (attr == "style" || attr == "css") {
			element.style = attributes[attr]
			continue;
		}
		if (attr == "content") {
			element.innerHTML = attributes.content;
			continue;
		}
		if (attr.startsWith("on")) {
			element.addEventListener(attr.replace("on",""), attributes[attr]);
			continue;
		}
		if (attr == "container") {
			attributes.container.appendChild(element);
			continue;
		}
		element.setAttribute(attr, attributes[attr]);
	}
	return element;
}
function getObjectLength(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
exports.Element = Element;
exports.Storage = Storage;
exports.getObjectLength = getObjectLength;