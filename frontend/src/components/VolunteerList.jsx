import { Grid, Link, Typography } from "@mui/material";
import volunteers from "../data/volunteers.json";

const VolunteerList = () => {
	return (
		<Grid
			container
			spacing={1}
			justifyContent="center"
			style={{ width: "100%" }}
		>
			<Typography
				sx={{
					font: "normal min(4vw,24px) Poppins, sans-serif",
					mb: "2vh",
				}}
				variant="body2"
				component="p"
				align="left"
				color="primary"
			>
				The fantasy league needed 80+ hours of data collection, 40+
				hours of data cleanup and entry and 50+ hours of tech work,
				apart from all the hours of ideation and operations/logistics
				work. A big thanks to all the volunteers who helped make this
				happen. <br />
				<br />
				Click{" "}
				<Link
					target="_blank"
					href="https://docs.google.com/spreadsheets/d/1kqC0AcrOOWmOYdrZFKgZKsY2LQyWsTlD832w9sBd1Wk/edit?usp=sharing"
				>
					here
				</Link>{" "}
				to see the raw data collected!
			</Typography>
			{Object.keys(volunteers).map((category) => {
				const names = volunteers[category];
				return (
					<Grid item xs={12} md={6} lg={4} key={category}>
						<Typography
							sx={{
								font: "bold min(4vw,24px) Poppins, sans-serif",
							}}
							variant="h6"
							component="h6"
							align="center"
							color="primary"
						>
							{category}
						</Typography>
						<ul>
							{names.map((name) => (
								<li
									style={{
										font: "normal 18px Poppins, sans-serif",
									}}
								>
									{name}
								</li>
							))}
						</ul>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default VolunteerList;
