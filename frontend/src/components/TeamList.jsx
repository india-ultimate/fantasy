import { Grid } from "@mui/material";
import teamLinks from "../data/team_logo_links.json";

const TeamList = () => {
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justifyContent="center"
			style={{ width: "100%" }}
		>
			{teamLinks.map((team) => (
				<img src={team.logo} width="40%" style={{ margin: "5%" }} />
			))}
		</Grid>
	);
};

export default TeamList;
