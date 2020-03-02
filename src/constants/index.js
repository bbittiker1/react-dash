import config from "../config";

export const JWT_TOKEN = "id_token";
export const CURRENT_USER = "currentUser";
export const CURRENT_USER_ID = "currentUserId";

// Sidebar/Drawer width when open.
export const DRAWER_WIDTH = 240;

export const APIS = (function() {
	const API_BASE = config.apiBase;

	return {
		login: `${API_BASE}/login`,
		changelog: `${API_BASE}/anomaly/changelog`,
		apiBase: API_BASE
	};
})();

export const ENVIRONMENTS = {
	production: "production",
	local: "local",
	dev: "dev"
};

export const META = {
	app: {
		title: "Dashboard"
	},
	action: {
		logout: "Logout"
	},
	company: {
		name: "Acme"
	}
};

export const THEME = {
	color: {
		main: "#C01818",
		mainDark:  "#75160D",
		brandSecondary: "#BECCFD",
		brandSuccess: "#1AB394",
		brandWarning: "#F3C363",
		brandInfo: "#5D80F9",
		brandDanger: "#EB3349"
	}
};
