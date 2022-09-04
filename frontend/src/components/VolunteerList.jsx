import { Grid, Typography } from "@mui/material";
import volunteers from "../data/volunteers.json";

const VolunteerList = () => {
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justifyContent="center"
			style={{ width: "100%" }}
		>
			<Typography
				sx={{
					font: "regular 2vw Poppins, sans-serif",
					mb: "2vh",
				}}
				variant="body2"
				component="body2"
				align="left"
				color="primary"
			>
				The fantasy league needed 80+ hours of data collection, 40+
				hours of data cleanup and entry and 50+ hours of tech work,
				apart from all the hours of ideation and operations/logistics
				work. A big thanks to all the volunteers who helped make this
				happen.
			</Typography>
			{Object.keys(volunteers).map((category) => {
				const names = volunteers[category];
				return (
					<Grid item xs={12} key={category}>
						<Typography
							sx={{
								font: "bold 2vw Poppins, sans-serif",
							}}
							variant="h6"
							component="h6"
							align="left"
							color="primary"
						>
							{category}
						</Typography>
						<ul>
							{names.map((name) => (
								<li>{name}</li>
							))}
						</ul>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default VolunteerList;
