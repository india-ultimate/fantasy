import { Button, Link, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
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
				<Grid
					container
					spacing={0}
					alignItems="center"
					justifyContent="center"
					style={{ height: "40vw", width: "100%" }}
				>
					<Grid item xs={12} sx={{ px: "10px" }}>
						<Typography
							variant="h1"
							component="h1"
							align="center"
							sx={{
								font: "5vh caption",
							}}
						>
							Sponsors
						</Typography>
					</Grid>
					<img
						style={{ width: "90%" }}
						src="https://res.cloudinary.com/india-ultimate/image/upload/v1661335497/ultimate-fantasy-league/sponsor-logos.png"
					/>
				</Grid>
			</Navbar>
		</div>
	);
};

export default Home;
