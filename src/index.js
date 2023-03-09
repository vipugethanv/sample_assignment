import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import Dashboard from "./Dashboard";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/dashboard" element = {<Dashboard/>}></Route>
        </Routes>
    </Router>
    
);

