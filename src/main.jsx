import React from 'react';
import { createRoot } from 'react-dom/client';
import ToDoApp from './components/ToDo';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<ToDoApp />);