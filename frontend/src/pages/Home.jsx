import { Button, Link, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import TeamList from "../components/TeamList";
import SponsorList from "../components/SponsorList";
import VolunteerList from "../components/VolunteerList";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar>
				<Grid
					container
					spacing={2}
					alignItems="center"
					justifyContent="center"
					sx={{ width: "100%" }}
				>
					<img
						src="https://res.cloudinary.com/india-ultimate/image/upload/v1661508047/ultimate-fantasy-league/logo-horizontal-2022.png"
						alt="logo"
						style={{ width: "100%", maxWidth: "500px" }}
					/>
					<Grid item xs={12}>
						<Typography
							sx={{
								// backgroundImage:
								// 	"-webkit-linear-gradient(60deg, #002B5B, #EF5B0C)",
								// backgroundClip: "text",
								// color: "transparent",
								font: "bold min(10vw, 62px) Poppins, sans-serif",
								mt: "2vh",
								mb: "5vh",
							}}
							variant="h1"
							component="h1"
							align="center"
							color="primary"
						>
							Fantasy League
						</Typography>
					</Grid>

					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
								my: "1vh",
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
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
								my: "1vh",
							}}
							onClick={() => navigate("/leaderboard")}
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
								<strong>Leaderboard</strong>
							</Typography>
							<Typography
								variant="caption"
								component="p"
								align="left"
							>
								Checkout the live Leaderboard!
							</Typography>
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
								my: "1vh",
							}}
							onClick={() => navigate("/rules")}
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
								<strong>Rules</strong>
							</Typography>
							<Typography
								variant="caption"
								component="p"
								align="left"
							>
								How does it work?
							</Typography>
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <Link
							href="https://forms.gle/kVeJG27Jf6PGmwQHA"
							target="_blank"
							sx={{
								textDecoration: "none",
                            }}
						> */}
						<Button
							variant="outlined"
							sx={{
								display: "block",
								width: "100%",
								height: "15vh",
								my: "1vh",
							}}
							disabled
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
						{/* </Link> */}
					</Grid>
				</Grid>
				<Divider>
					<Typography
						variant="overline"
						component="h3"
						align="center"
						sx={{
							fontSize: "min(3.5vw,32px)",
							opacity: 0.65,
						}}
					>
						Volunteers
					</Typography>
				</Divider>
				<VolunteerList />
				<Divider>
					<Typography
						variant="overline"
						component="h3"
						align="center"
						sx={{
							fontSize: "min(3.5vw,32px)",
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
							fontSize: "min(3.5vw,32px)",
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
