import {
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
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
import data from "../data/fantasy_scores.json";
import { points, displayNames } from "../utils/fantasyCommons";

const Rules = () => {
	const player = {};
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
								font: "bold 10vw Poppins, sans-serif",
							}}
							variant="h6"
							component="h6"
							align="center"
							color="primary"
						>
							Rules
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ mt: "2vh" }}>
						<Grid item xs={12} sx={{ px: "10px" }}>
							<Typography
								sx={{
									font: "bold 5vw Poppins, sans-serif",
								}}
								variant="h6"
								component="h6"
								align="center"
								color="primary"
							>
								How does it work?
							</Typography>
						</Grid>
						<ul>
							<li>Select 8 Players</li>
							<li>
								Select 4 male-matching players and select
								female-matching players
							</li>
							<li>
								You can only select a 1 male-matching and 1
								female-matching player from each state
							</li>
							<li>
								Simple as that. The Winner and Runner-up will
								get a disc each from 91Ultimate
							</li>
						</ul>
					</Grid>
					<Grid item xs={12} sx={{ mt: "2vh" }}>
						<Grid item xs={12} sx={{ px: "10px" }}>
							<Typography
								sx={{
									// backgroundImage:
									// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
									// backgroundClip: "text",
									// color: "transparent",
									font: "bold 5vw Poppins, sans-serif",
								}}
								variant="h6"
								component="h6"
								align="center"
								color="primary"
							>
								How do you earn points?
							</Typography>
						</Grid>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="center">
											Action
										</TableCell>
										<TableCell align="center">
											Points
										</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								{points.map((event) => (
									<TableRow
										key={event.event}
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
										>
											{displayNames[event.event]}
										</TableCell>
										<TableCell
											align="center"
											title={`${player.name} — ${player.timestamp}`}
										>
											{event.points}
										</TableCell>
									</TableRow>
								))}
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Navbar>
		</div>
	);
};

export default Rules;
