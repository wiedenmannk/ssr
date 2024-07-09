export { AppServerModule as default } from "./app/app.module.server";

import { XMLHttpRequest } from "xhr2";
global.XMLHttpRequest = XMLHttpRequest;
