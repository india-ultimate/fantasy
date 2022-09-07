import {
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import playersData from "../data/players.json";
import PlayerRow from "./PlayerRow";
import teamsData from "../data/teams.json";

const LeaderboardRow = ({ player, playersMap }) => {
	const [open, setOpen] = React.useState(false);
	const [players, setPlayers] = React.useState([]);
	const unknown = { name: "Unknown Player", team: "" };

	React.useEffect(() => {
		setPlayers(
			player["team_slugs"]
				.map(
					(slug) =>
						playersData.find((player) => player.slug === slug) || {
							team: "",
							name: slug,
							slug,
						}
				)
				.sort((a, b) => b["fantasy-points"] - a["fantasy-points"])
				.map((p) => {
					const team = teamsData.find((it) => it.name === p.team);
					const teamLogo = team?.logo;
					return { ...p, teamLogo };
				})
		);
	}, [player]);

	return (
		<>
			<TableRow
				key={player.rank}
				sx={{
					"&:last-child td, &:last-child th": {
						border: 0,
					},
				}}
			>
				<TableCell component="th" scope="row" align="left">
					{player.rank}
				</TableCell>
				<TableCell
					align="center"
					title={`${player.name} — ${player.timestamp}`}
				>
					{player.name}
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
							font: "bold  min(3.5vw, 24px)/2.66 Poppins, sans-serif",
						}}
						variant="overline"
						component="p"
						color={"primary"}
					>
						{player["fantasy_score"]}
					</Typography>
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
			</TableRow>
			{open && (
				<TableRow key={player.rank + "-details"}>
					<TableCell
						style={{ paddingBottom: 0, paddingTop: 0 }}
						colSpan={6}
					>
						<Collapse in={open} timeout="auto">
							<TableContainer
								component={Paper}
								sx={{ my: "2vh" }}
							>
								<Table aria-label="simple table">
									<TableBody>
										{players.map((p) => (
											<PlayerRow player={p} />
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default LeaderboardRow;
