import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import initPlugin from "./plugins"



export function createApp() {
	const app = createSSRApp(App);

  initPlugin(app)

	return {
		app,
	};
}
