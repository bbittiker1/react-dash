import React, {useEffect, useState, useRef, useCallback } from "react";
import Spinner from "react-svg-spinner";

import axios from "axios";
import {Avatar, Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import PieChartIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { chartStyles } from "../../styles/chart";

const List = () => {
	const perPage = 10;
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setLoading] = useState(false);

	const classes = chartStyles();

	// Create ref to attach to the loader div
	const loadingRef = useRef(null);

	const getUsers = (page) => {
		setLoading(true);
		const url = `https://api.github.com/users?since=${page}&per_page=${perPage}`;

		axios
			.get(url)
			.then(res => {
				setUsers( [...users, ...res.data]);
				setPage(page + 1);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const reload = () => {
		setUsers([]);
		setPage(0);
	};

	const handleObserver = useCallback((entries) => {
		const entry = entries[0];

		if (entry.isIntersecting) {
			!isLoading && getUsers(page);
		}

	}, [isLoading]);

	useEffect(() => {
		const options = {
			root: null, // Page as root
			rootMargin: "0px",
			threshold: 1.0
		};

		// Create an observer
		const observer = new IntersectionObserver(
			handleObserver, //callback
			options
		);

		//Observe the `loadingRef`
		if (loadingRef && loadingRef.current) {
			observer.observe(loadingRef.current);
		}

		return () => observer.unobserve(loadingRef.current);
	}, [loadingRef, handleObserver]);

	return (
		<Card className={classes.card} elevation={0}>
			<CardHeader
				classes={{
					title: classes.title,
					subheader: classes.subheader
				}}
				avatar={
					<Avatar aria-label="" className={classes.avatar}>
						<PieChartIcon />
					</Avatar>
				}
				action={
					<IconButton disabled={false} onClick={() => {reload()}} title={"Refresh"}>
						<i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}/>
					</IconButton>
				}
				title="Widget Users"
				subheader={`Infinite Scroll: Users: ${users.length} Current Page: ${page}`}
			/>

			<CardContent>
				<div className="container" style={{ maxHeight: "300px", minHeight: "300px", overflowY: "scroll"}} >
					<div>
						<ul >
							{users.map(user => <li key={Math.random() * 100}>{user.login}</li>)}
						</ul>
					</div>
					<div ref={loadingRef} className={classes.infiniteScrollLoader}>
						{isLoading && <Spinner color="#75160D" size="24px" thickness={3}/>}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default (List);
