import { Grid, Link } from "@mui/material";
import sponsors from "../data/sponsors.json";

const SponsorList = () => {
	return (
		<Grid
			container
			spacing={12}
			alignItems="center"
			justifyContent="center"
			style={{ width: "100%" }}
		>
			{sponsors.map((sponsor) => (
				<Grid item xs={6} md={4} lg={3}>
					<Link
						key={sponsor.name}
						href={sponsor.link}
						target="_blank"
						rel="noopener"
						sx={{ width: "100%" }}
					>
						<img
							src={sponsor.logo}
							alt={sponsor.name}
							title={sponsor.name}
							width="100%"
						/>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default SponsorList;
