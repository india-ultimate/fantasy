import { Avatar, Link, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PlayerRow = ({ player }) => {
	const navigate = useNavigate();
	return (
		<TableRow
			key={player.ucID}
			sx={{
				"&:last-child td, &:last-child th": {
					border: 0,
				},
			}}
		>
			<TableCell component="th" scope="row" align="left">
				<Link
					onClick={() => navigate("/player/" + player.slug)}
					component="button"
					variant="body2"
					color={
						player["gender"] === "male" ? "primary" : "secondary"
					}
				>
					{player["name"]}
				</Link>
			</TableCell>
			<TableCell component="th" scope="row" align="left">
				<Avatar
					alt={player.team}
					src={player.teamLogo}
					title={player.team}
				/>
			</TableCell>

			<TableCell align="center">
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
					color={
						player["gender"] === "male" ? "primary" : "secondary"
					}
				>
					{player["fantasy-points"]}
				</Typography>
			</TableCell>
		</TableRow>
	);
};

export default PlayerRow;
