import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Grid,
	Link,
	List,
	ListItem,
	ListItemText,
	Paper,
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
import data from "../data/fantasy_scores.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Leaderboard = () => {
	const [validScores, setValidScores] = useState();
	const [search, setSearch] = useState("");

	useEffect(() => {
		setValidScores(
			data
				.filter((p) => p["valid_team"])
				.map((p, i) => {
					console.log(p);
					return {
						...p,
						rank: i + 1,
					};
				})
		);
	}, []);

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
							Leaderboard
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ mt: "2vh" }}>
						<TextField
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							label="Search"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: "2vh" }}>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">Rank</TableCell>
										<TableCell align="center">
											Name
										</TableCell>
										<TableCell align="center">
											Fantasy Score
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{validScores &&
										validScores
											.filter((p) =>
												p["name"]
													.toLowerCase()
													.includes(
														search.toLowerCase()
													)
											)
											.map((player) => (
												<TableRow
													key={player.rank}
													sx={{
														"&:last-child td, &:last-child th":
															{
																border: 0,
															},
													}}
												>
													<TableCell
														component="th"
														scope="row"
														align="left"
													>
														{player.rank}
													</TableCell>
													<TableCell
														align="center"
														title={`${player.name} — ${player.timestamp}`}
													>
														{player.name}
													</TableCell>
													<TableCell align="center">
														{
															player[
																"fantasy_score"
															]
														}
													</TableCell>
												</TableRow>
											))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={12} sx={{ mt: "5vh" }}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Invalid Entries</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{data
										.filter((p) => !p["valid_team"])
										.map((player) => (
											<ListItem>
												<ListItemText>
													<Typography>
														{player.name} &mdash;{" "}
														{player.timestamp}
													</Typography>
												</ListItemText>
											</ListItem>
										))}
								</List>
							</AccordionDetails>
						</Accordion>
						<Typography
							align="center"
							variant="overline"
							component="p"
							sx={{
								fontSize: "4vw",
								opacity: 0.65,
								mt: "2vh",
							}}
						>
							Click{" "}
							<Link href="https://forms.gle/kVeJG27Jf6PGmwQHA">
								here
							</Link>{" "}
							to fill your entry!
						</Typography>
					</Grid>
				</Grid>
			</Navbar>
		</div>
	);
};

export default Leaderboard;
