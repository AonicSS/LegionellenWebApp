import React from 'react';
import Calculator from '../components/calculator';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import AppStore from "../redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {install} from "redux-loop";
import messagesDE from '../i18n/de.flat.json';

import { IntlProvider } from 'react-intl';


const store = createStore(AppStore as any, composeWithDevTools(install()));

function Home() {
	return (

		<IntlProvider locale="de-DE" messages={messagesDE}>
		<Provider store={store}>
			<Calculator />
		</Provider>
		</IntlProvider>
	);
}

export default Home;
