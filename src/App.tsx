import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './views/calculator';
import EmailForm from './views/emailform';
import ContactForm from './views/contactform';
import ReminderForm from './views/reminderform';
import Summary from './views/summary';

import './styles/index.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Calculator />} />
				<Route path="/summary" element={<Summary />} />
				<Route path="/reminder" element={<ReminderForm />} />
				<Route path="/emailform" element={<EmailForm />} />
				<Route path="/contactform" element={<ContactForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
