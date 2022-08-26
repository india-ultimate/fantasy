import { Grid, Link } from "@mui/material";
import sponsors from "../data/sponsors.json";

const SponsorList = () => {
	return (
		<Grid
			container
			spacing={0}
			alignItems="center"
			justifyContent="center"
			style={{ width: "100%" }}
		>
			{sponsors.map((sponsor) => (
				<Link
					key={sponsor.name}
					href={sponsor.link}
					target="_blank"
					rel="noopener"
					sx={{ margin: "5%", width: "40%" }}
				>
					<img
						src={sponsor.logo}
						alt={sponsor.name}
						title={sponsor.name}
						width="100%"
					/>
				</Link>
			))}
		</Grid>
	);
};

export default SponsorList;
