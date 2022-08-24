import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	Divider,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { displayNames } from "../utils/fantasyCommons";

const PlayerProfile = () => {
	const [player, setPlayer] = useState({
		name: "Jonathan Samuel",
		jersey: "3",
		team: "Learning 2 Fly",
		gender: "Male",
		"fantasy-points": 297.5,
		"points-distribution": {
			assist: 10,
			block: 0,
			"d-line": 4,
			"d-scoring-line": 1,
			defense: 0,
			drop: 0,
			goal: 4,
			"o-line": 52,
			"o-scoring-line": 40,
			throwaway: -7,
		},
		stats: {
			"Austin Sol": {
				assist: 10,
				block: 0,
				"d-line": 4,
				"d-scoring-line": 1,
				defense: 0,
				drop: 0,
				goal: 4,
				"o-line": 52,
				"o-scoring-line": 40,
				throwaway: 7,
			},
			"Dallas Roughnecks": {
				assist: 4,
				block: 0,
				"d-line": 0,
				"d-scoring-line": 0,
				defense: 0,
				drop: 1,
				goal: 3,
				"o-line": 29,
				"o-scoring-line": 24,
				throwaway: 3,
			},
			"Indianapolis Alleycats": {
				assist: 5,
				block: 0,
				"d-line": 0,
				"d-scoring-line": 0,
				defense: 0,
				drop: 0,
				goal: 2,
				"o-line": 22,
				"o-scoring-line": 20,
				throwaway: 1,
			},
			"Raleigh Flyers": {
				assist: 3,
				block: 0,
				"d-line": 15,
				"d-scoring-line": 3,
				defense: 2,
				drop: 3,
				goal: 2,
				"o-line": 36,
				"o-scoring-line": 25,
				throwaway: 4,
			},
			"Tampa Bay Cannons": {
				assist: 2,
				block: 0,
				"d-line": 11,
				"d-scoring-line": 3,
				defense: 0,
				drop: 1,
				goal: 1,
				"o-line": 16,
				"o-scoring-line": 12,
				throwaway: 4,
			},
		},
	});
	const navigate = useNavigate();

	return (
		<div>
			<Navbar>
				<Grid container spacing={0} justifyContent="center">
					{player ? (
						<>
							<Grid item xs={12}>
								<Button
									variant="text"
									startIcon={<ArrowBackIosNewIcon />}
									size="small"
								>
									Go Back
								</Button>
							</Grid>
							<Box
								component="img"
								sx={{
									height: { xs: 150, md: 250 },
									width: { xs: 150, md: 250 },
									maxHeight: { xs: 150, md: 250 },
									maxWidth: { xs: 150, md: 250 },
									borderRadius: "50%",
								}}
								alt={player.name}
								src="https://avatars.githubusercontent.com/u/67282400?v=4"
							/>
							<Grid item xs={12}>
								<Typography
									sx={{
										backgroundImage:
											"-webkit-linear-gradient(60deg, #E21143, #FFB03A)",
										backgroundClip: "text",
										color: "transparent",
										font: "bold 8vw Poppins, sans-serif",
										mt: "2vh",
									}}
									variant="h6"
									component="h1"
									align="center"
								>
									{player.name}
								</Typography>
								<Typography
									variant="overline"
									component="h2"
									align="center"
									sx={{
										fontSize: "4vw",
										opacity: 0.65,
									}}
								>
									{"#" + player.jersey + " | " + player.team}
								</Typography>
								<Grid
									container
									spacing={0}
									justifyContent="center"
								>
									<Chip
										label={player["gender"]}
										variant="outlined"
										color={
											player["gender"] === "Male"
												? "primary"
												: "secondary"
										}
									/>
								</Grid>
							</Grid>
							<Divider sx={{ width: "100%", mt: "2vh" }} />
							<Grid item xs={12}>
								<Typography
									variant="overline"
									component="h3"
									align="center"
									sx={{
										fontSize: "3.5vw",
										opacity: 0.65,
									}}
								>
									Points scored
								</Typography>
								<Typography
									sx={{
										backgroundImage:
											"-webkit-linear-gradient(60deg, #E21143, #FFB03A)",
										backgroundClip: "text",
										color: "transparent",
										font: "bold 8vw Poppins, sans-serif",
									}}
									variant="h6"
									component="h4"
									align="center"
								>
									{player["fantasy-points"]}
								</Typography>

								<Divider sx={{ width: "100%", mt: "2vh" }} />
								<Typography
									variant="overline"
									component="h3"
									align="center"
									sx={{
										fontSize: "3.5vw",
										opacity: 0.65,
									}}
								>
									Scorecard
								</Typography>
								<Grid
									container
									spacing={0}
									justifyContent="center"
									sx={{
										mt: "1vh",
										borderWidth: "1px",
										borderStyle: "groove",
										borderRadius: "20px",
									}}
								>
									{Object.keys(
										player["points-distribution"]
									).map((statName) => (
										<>
											<Grid item xs={9}>
												<Typography
													align="center"
													variant="overline"
													component="p"
													sx={{
														fontSize: "3.5vw",
														opacity: 0.65,
													}}
												>
													{displayNames[statName]}
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography
													align="center"
													sx={{
														backgroundImage:
															"-webkit-linear-gradient(60deg, #E21143, #FFB03A)",
														backgroundClip: "text",
														color: "transparent",
														lineHeight: "2.66",
														font: "bold 3.5vw/2.66 Poppins, sans-serif",
													}}
													variant="overline"
													component="p"
												>
													{
														player[
															"points-distribution"
														][statName]
													}
												</Typography>
											</Grid>
										</>
									))}
								</Grid>
							</Grid>
							<Divider sx={{ width: "100%", mt: "2vh" }} />
							<Grid item xs={12}>
								<Typography
									variant="overline"
									component="h3"
									align="center"
									sx={{
										fontSize: "3.5vw",
										opacity: 0.65,
									}}
								>
									Game Stats
								</Typography>
								{Object.keys(player.stats).map((team) => (
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id={team}
										>
											<Typography>{team}</Typography>
										</AccordionSummary>
										<AccordionDetails>
											<TableContainer component={Paper}>
												<Table aria-label="simple table">
													<TableBody>
														{Object.keys(
															player.stats[team]
														).map((statName) => (
															<TableRow
																key={statName}
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
																>
																	{
																		displayNames[
																			statName
																		]
																	}
																</TableCell>
																<TableCell align="right">
																	{
																		player
																			.stats[
																			team
																		][
																			statName
																		]
																	}
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</AccordionDetails>
									</Accordion>
								))}
							</Grid>
						</>
					) : (
						<>
							<Typography variant="overline" sx={{ mb: "5px" }}>
								{"Player not found! :("}
							</Typography>
							<Button
								variant="outlined"
								onClick={() => navigate("/players")}
							>
								Take me to All Players
							</Button>
						</>
					)}
				</Grid>
			</Navbar>
		</div>
	);
};

export default PlayerProfile;
