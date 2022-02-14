import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './views/calculator';
import ReminderForm from './views/reminderform';

import './styles/index.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Calculator />} />
				<Route path="reminder" element={<ReminderForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
