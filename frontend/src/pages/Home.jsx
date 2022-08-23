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
					style={{ height: "90vh", width: "100%" }}
				>
					<Grid item xs={12} sx={{ px: "10px" }}>
						<Typography
							sx={{
								font: "italic 5vw Poppins, sans-serif",
							}}
							variant="h1"
							component="h1"
							align="center"
						>
							The Ultimate
						</Typography>
						<Typography
							sx={{
								backgroundImage:
									"-webkit-linear-gradient(60deg, #E21143, #FFB03A)",
								backgroundClip: "text",
								color: "transparent",
								font: "bold 10vw Poppins, sans-serif",
							}}
							variant="h1"
							component="h1"
							align="center"
						>
							Fantasy League
						</Typography>
						<div class="mouse_scroll">
							<div class="mouse">
								<div class="wheel"></div>
							</div>
							<div>
								<span class="m_scroll_arrows unu"></span>
								<span class="m_scroll_arrows doi"></span>
								<span class="m_scroll_arrows trei"></span>
							</div>
						</div>
					</Grid>
				</Grid>
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
			</Navbar>
		</div>
	);
};

export default Home;
