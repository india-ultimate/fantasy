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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { statsOrder, displayNames } from "../utils/fantasyCommons";
import data from "../data/players.json";

const PlayerProfile = () => {
	let { slug } = useParams();
	const [player, setPlayer] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setPlayer(data.filter((p) => p.slug === slug)[0] || null);
	}, [slug]);

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
									onClick={() => navigate(-1)}
								>
									Go Back
								</Button>
							</Grid>
							{player.photo && (
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
									src={player.photo}
								/>
							)}

							<Grid item xs={12}>
								<Typography
									sx={{
										// backgroundImage:
										// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
										// backgroundClip: "text",
										// color: "transparent",
										font: "bold 8vw Poppins, sans-serif",
										mt: "2vh",
									}}
									variant="h6"
									component="h1"
									align="center"
									color="primary"
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
										sx={{
											textTransform: "capitalize",
										}}
										label={player["gender"]}
										variant="outlined"
										color={
											player["gender"] === "male"
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
									Fantasy Points
								</Typography>
								<Typography
									sx={{
										// backgroundImage:
										// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
										// backgroundClip: "text",
										// color: "transparent",
										font: "bold 8vw Poppins, sans-serif",
									}}
									variant="h6"
									component="h4"
									align="center"
									color="primary"
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
									<>
										<Grid item xs={6}>
											<Typography
												align="center"
												variant="overline"
												component="p"
												sx={{
													fontSize: "3.5vw",
													opacity: 0.65,
												}}
											>
												{""}
											</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography
												align="center"
												sx={{
													// backgroundImage:
													// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
													// backgroundClip: "text",
													// color: "transparent",
													lineHeight: "2.66",
													font: "bold 3.5vw/2.66 Poppins, sans-serif",
												}}
												variant="overline"
												component="p"
												color="primary"
											>
												Stats
											</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography
												align="center"
												sx={{
													lineHeight: "2.66",
													font: "bold 3.5vw/2.66 Poppins, sans-serif",
												}}
												variant="overline"
												component="p"
												color="primary"
											>
												Score
											</Typography>
										</Grid>
									</>
									{statsOrder.map((statName) => (
										<>
											<Grid item xs={6}>
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
														lineHeight: "2.66",
														font: "bold 3.5vw/2.66 Poppins, sans-serif",
													}}
													variant="overline"
													component="p"
													color="primary"
												>
													{`${player["stats-distribution"][statName]}`}
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography
													align="center"
													sx={{
														lineHeight: "2.66",
														font: "bold 3.5vw/2.66 Poppins, sans-serif",
													}}
													variant="overline"
													component="p"
													color="primary"
												>
													{`${player["points-distribution"][statName]}`}
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
								{Object.keys(player.stats).map(teamDay => {
									const [team, day] = teamDay.split(";");
									return (
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id={teamDay}
											>
												<Typography>
													{team} &mdash;{" "}
													<Typography
														component="span"
														sx={{
															textTransform:
																"capitalize"
														}}
													>
														{day}
													</Typography>
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<TableContainer
													component={Paper}
												>
													<Table aria-label="simple table">
														<TableBody>
															{statsOrder.map(
																statName => (
																	<TableRow
																		key={
																			statName
																		}
																		sx={{
																			"&:last-child td, &:last-child th": {
																				border: 0
																			}
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
																					teamDay
																				][
																					statName
																				]
																			}
																		</TableCell>
																	</TableRow>
																)
															)}
														</TableBody>
													</Table>
												</TableContainer>
											</AccordionDetails>
										</Accordion>
									);
								})}
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
