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
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import data from "../data/players.json";
import teamsData from "../data/teams.json";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

const PlayersList = () => {
	const [team, setTeam] = useState("all");
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);
	const [male, setMale] = useState(true);
	const [female, setFemale] = useState(true);
	const navigate = useNavigate();

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
								backgroundImage:
									"-webkit-linear-gradient(60deg, #E21143, #FFB03A)",
								backgroundClip: "text",
								color: "transparent",
								font: "bold 10vw Poppins, sans-serif",
							}}
							variant="h6"
							component="h6"
							align="center"
						>
							Players
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ pt: "25px" }}>
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
										<TableCell align="center">
											Gender
										</TableCell>
										<TableCell align="center">
											Fantasy Points
										</TableCell>
										<TableCell align="right">
											Stats
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{players.map((player) => (
										<TableRow
											key={player.ucID}
											sx={{
												"&:last-child td, &:last-child th": {
													border: 0,
												},
											}}
										>
											<TableCell
												component="th"
												scope="row"
												align="left"
												sx={{
													textTransform: "capitalize",
												}}
											>
												{player["name"]}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
												align="left"
											>
												<img
													style={{ height: "3em" }}
													src={player.teamLogo}
												/>
											</TableCell>
											<TableCell
												align="center"
												sx={{
													textTransform: "capitalize",
												}}
											>
												<Chip
													label={player["gender"]}
													variant="outlined"
													color={
														player["gender"] ===
														"male"
															? "primary"
															: "secondary"
													}
												/>
											</TableCell>
											<TableCell align="center">
												{player["fantasy-points"]}
											</TableCell>
											<TableCell align="right">
												<IconButton
													color="primary"
													onClick={() =>
														navigate(
															"/player/" +
																player.slug
														)
													}
												>
													<InfoOutlinedIcon />
												</IconButton>
											</TableCell>
										</TableRow>
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
