import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Calculator from './views/calculator';
import EmailForm from './views/emailform';
import ReminderForm from './views/reminderform';

import './styles/index.css';

function App() {
	return (
		<HashRouter basename={'/'}>
			<Routes>
				<Route path="/" element={<Calculator />} />
				<Route path="/reminder" element={<ReminderForm />} />
				<Route path="/emailform" element={<EmailForm />} />
				<Route path="*" element={<Calculator />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
