import { Button, Link, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import TeamList from "../components/TeamList";
import SponsorList from "../components/SponsorList";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar>
				<Grid
					container
					spacing={0}
					alignItems="center"
					justifyContent="center"
					style={{ height: "60vh", width: "100%" }}
				>
					<Grid item xs={12}>
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
							}}
							onClick={() => navigate("/players")}
						>
							<KeyboardDoubleArrowRightIcon
								sx={{
									position: "absolute",
									right: "10%",
									top: "40%",
								}}
							/>
							<Typography
								variant="h5"
								component="h5"
								align="left"
							>
								<strong>Players</strong>
							</Typography>
							<Typography
								variant="caption"
								component="p"
								align="left"
							>
								Checkout the live points!
							</Typography>
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
							}}
						>
							<KeyboardDoubleArrowRightIcon
								sx={{
									position: "absolute",
									right: "10%",
									top: "40%",
								}}
							/>
							<Typography
								variant="h5"
								component="h5"
								align="left"
							>
								<strong>Leaderboards</strong>
							</Typography>
							<Typography
								variant="caption"
								component="p"
								align="left"
							>
								Checkout the live Leaderboards!
							</Typography>
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Link
							href="https://forms.gle/kVeJG27Jf6PGmwQHA"
							target="_blank"
							sx={{
								textDecoration: "none",
							}}
						>
							<Button
								variant="outlined"
								sx={{
									display: "block",
									width: "100%",
									height: "15vh",
								}}
							>
								<KeyboardDoubleArrowRightIcon
									sx={{
										position: "absolute",
										right: "10%",
										top: "40%",
									}}
								/>
								<Typography
									variant="h5"
									component="h5"
									align="left"
								>
									<strong>My Squad</strong>
								</Typography>
								<Typography
									variant="caption"
									component="p"
									align="left"
								>
									Create your squad!
								</Typography>
							</Button>
						</Link>
					</Grid>
				</Grid>
				<Divider>
					<Typography
						variant="overline"
						component="h3"
						align="center"
						sx={{
							fontSize: "3.5vw",
							opacity: 0.65,
						}}
					>
						Teams Participating
					</Typography>
				</Divider>
				<TeamList />
				<Divider>
					<Typography
						variant="overline"
						component="h3"
						align="center"
						sx={{
							fontSize: "3.5vw",
							opacity: 0.65,
						}}
					>
						Sponsors
					</Typography>
				</Divider>
				<SponsorList />
			</Navbar>
		</div>
	);
};

export default Home;
