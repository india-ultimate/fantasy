import {
	Avatar,
	CardHeader,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
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

const PlayersList = () => {
	const [team, setTeam] = useState("all");
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);
	const [male, setMale] = useState(true);
	const [female, setFemale] = useState(true);

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
					(p["gender"] === "Male" && male) ||
			                (p["gender"] === "Female" && female) ||
                                        (male && female)
			)
			.sort((a, b) => b["fantasy-points"] - a["fantasy-points"]);
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
									<MenuItem value={name}>{name}</MenuItem>
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
										<TableCell align="center">
											Gender
										</TableCell>
										<TableCell align="center">
											Points Scored
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{players.map((player) => (
										<TableRow
											key={1}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}
										>
											<TableCell
												component="th"
												scope="row"
												align="left"
											>
												{player["name"]}
											</TableCell>

											<TableCell align="center">
												<Chip
													label={player["gender"]}
													variant="outlined"
													color={
														player["gender"] ===
														"Male"
															? "primary"
															: "secondary"
													}
												/>
											</TableCell>
											<TableCell align="center">
												{player["fantasy-points"]}
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
