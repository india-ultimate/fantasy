import { Grid } from "@mui/material";
import teamLinks from "../data/teams.json";

const TeamList = () => {
	return (
		<Grid
			container
			spacing={4}
			alignItems="center"
			justifyContent="center"
			style={{ width: "100%" }}
		>
			{teamLinks.map((team) => (
				<Grid item xs={6} md={4} lg={3}>
					<img key={team.iuSlug} src={team.logo} width="100%" />
				</Grid>
			))}
		</Grid>
	);
};

export default TeamList;
