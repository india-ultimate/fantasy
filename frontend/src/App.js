import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import PlayerProfile from "./pages/PlayerProfile";
import PlayersList from "./pages/PlayersList";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/players" element={<PlayersList />} />
			<Route path="/player/:slug" element={<PlayerProfile />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
		</Routes>
	);
}

export default App;
