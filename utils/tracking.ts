export const trackStepper = (step: number, subStep: number) => {
	let pageIdentifier = `step: ${step}, subStep: ${subStep}`;

	window.siteDataLayer = window.siteDataLayer || [];
	window.siteDataLayer.push({
		event: 'pageView',
		pageLanguage: 'de',
		pageIdentifier: pageIdentifier, // Optional, but necessary if no virtual page path in url
		pageName: document.title, // document.title
		pagePath: window.location.pathname, // Path w/o query parameters
		pageURL: window.location.href, // Full URL
		virtualPagePath: window.location.hash, // Virtual hash routing path, including #, empty string if 'null/undefined'
	});
};

export const trackSummary = (page: string, pricing: string) => {
	window.siteDataLayer = window.siteDataLayer || [];
	window.siteDataLayer.push({
		event: 'pageView',
		pageLanguage: 'de',
		pageIdentifier: `${page}_${pricing}`, // Optional, but necessary if no virtual page path in url
		pageName: document.title, // document.title
		pagePath: window.location.pathname, // Path w/o query parameters
		pageURL: window.location.href, // Full URL
		virtualPagePath: window.location.hash, // Virtual hash routing path, including #, empty string if 'null/undefined'
	});
};

export const trackPage = (page: string) => {
	window.siteDataLayer = window.siteDataLayer || [];
	window.siteDataLayer.push({
		event: 'pageView',
		pageLanguage: 'de',
		pageIdentifier: page, // Optional, but necessary if no virtual page path in url
		pageName: document.title, // document.title
		pagePath: window.location.pathname, // Path w/o query parameters
		pageURL: window.location.href, // Full URL
		virtualPagePath: window.location.hash, // Virtual hash routing path, including #, empty string if 'null/undefined'
	});
};
