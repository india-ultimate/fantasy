import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PlayerProfile from "./pages/PlayerProfile";
import PlayersList from "./pages/PlayersList";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/players" element={<PlayersList />} />
			<Route path="/player/:id" element={<PlayerProfile />} />
		</Routes>
	);
}

export default App;
