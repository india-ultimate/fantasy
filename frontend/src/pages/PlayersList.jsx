import {
	Avatar,
	CardHeader,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	InputLabel,
	Link,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import data from "../data/players.json";
import teamsData from "../data/teams.json";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import PlayerRow from "../components/PlayerRow";

const PlayersList = () => {
	const [team, setTeam] = useState("all");
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);
	const [male, setMale] = useState(true);
	const [female, setFemale] = useState(true);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	useEffect(() => {
		let teamsMap = new Map();

		for (const i in data) {
			teamsMap.set(data[i]["team"], true);
		}

		const arr = [...teamsMap].map(([name, value]) => name);
		setTeams(arr);
	}, []);

	useEffect(() => {
		let newPlayers = data
			.filter((p) => p["team"] === team || team === "all")
			.filter(
				(p) =>
					(p["gender"] === "male" && male) ||
					(p["gender"] === "female" && female) ||
					(male && female)
			)
			.sort((a, b) => b["fantasy-points"] - a["fantasy-points"])
			.map((p) => {
				const team = teamsData.find((it) => it.name === p.team);
				const teamLogo = team?.logo;
				return { ...p, teamLogo };
			});
		setPlayers(newPlayers);
	}, [team, male, female]);

	return (
		<div>
			<Navbar>
				<Grid container spacing={0} justifyContent="center">
					<Grid item xs={12} sx={{ px: "10px" }}>
						<Typography
							sx={{
								// backgroundImage:
								// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
								// backgroundClip: "text",
								// color: "transparent",
								font: "bold min(10vw, 62px) Poppins, sans-serif",
							}}
							variant="h6"
							component="h6"
							align="center"
							color="primary"
						>
							Players
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ pt: "25px" }}>
						<TextField
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							label="Search"
							fullWidth
							sx={{ mb: "2vh" }}
						/>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Team
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={team}
								label="Team"
								onChange={(e) => setTeam(e.target.value)}
							>
								<MenuItem value={"all"}>All Teams</MenuItem>
								{teams.map((name) => (
									<MenuItem key={name} value={name}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<FormControlLabel
						control={
							<Checkbox
								checked={male}
								onChange={(e) => setMale(e.target.checked)}
							/>
						}
						label="Male"
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="secondary"
								checked={female}
								onChange={(e) => setFemale(e.target.checked)}
							/>
						}
						label="Female"
					/>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">Team</TableCell>
										{/* <TableCell align="center">
											Gender
										</TableCell> */}
										<TableCell align="center">
											Fantasy Points
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{players
										.filter((p) =>
											p["name"]
												.toLowerCase()
												.includes(search.toLowerCase())
										)
										.map((player) => (
											<PlayerRow player={player} />
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Navbar>
		</div>
	);
};

export default PlayersList;
