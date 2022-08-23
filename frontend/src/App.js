import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PlayersList from "./pages/PlayersList";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/players" element={<PlayersList />} />
		</Routes>
	);
}

export default App;
