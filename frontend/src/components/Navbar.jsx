import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import { Icon, Link } from "@mui/material";

const drawerWidth = 240;
const navItems = [
	{
		title: "Players",
		url: "/players",
	},
];

function Navbar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography
				variant="h6"
				sx={{
					my: 2,
					mx: 1,
					fontFamily: "monospace",
					fontWeight: 700,
					letterSpacing: ".3rem",
				}}
			>
				FANTASY LEAGUE
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton
							sx={{ textAlign: "center" }}
							onClick={() => navigate(item.url)}
						>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex", position: "relative" }}>
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<EmojiEventsIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							flexGrow: 1,
							display: { xs: "block" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						FANTASY LEAGUE
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Button
								key={item.title}
								sx={{ color: "#fff" }}
								onClick={() => navigate(item.url)}
							>
								{item.title}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ p: 3, width: "100%", mb: "5vh" }}>
				<Toolbar />
				{props.children}
			</Box>
			<Box
				component="footer"
				sx={{
					backgroundColor: "primary.main",
					height: "5vh",
					width: "100vw",
					position: "absolute",
					bottom: 0,
					left: 0,
				}}
			>
				<Typography
					variant="body1"
					align="center"
					color="white"
					sx={{ mt: "1vh" }}
				>
					<Link
						href="https://github.com/india-ultimate/fantasy"
						target="_blank"
						underline="none"
						sx={{ color: "white", mr: "10px" }}
					>
						<IconButton
							color="inherit"
							component="span"
							size="small"
						>
							<Icon
								className="fab fa-github"
								color="inherit"
								fontSize="small"
							></Icon>
						</IconButton>
					</Link>
					Built with ❤️ in Bangalore, India
				</Typography>
			</Box>
		</Box>
	);
}

Navbar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default Navbar;
