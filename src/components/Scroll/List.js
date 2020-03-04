import React, {useEffect, useState, useRef, useCallback } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Avatar, Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import Spinner from "react-svg-spinner";

import PieChartIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { chartStyles } from "../../styles/chart";
import { fetchScroll } from "../../actions/scroll";

const List = (props) => {
	const { fetchScroll, users, isLoading, page } = props;
	const perPage = 10;
	const classes = chartStyles();

	// Create ref to attach to the loader div
	const loadingRef = useRef(null);

	const reload = () => {
		// setUsers([]);
		// setPage(0);
	};

	const handleObserver = useCallback((entries) => {
		const entry = entries[0];

		if (entry.isIntersecting) {
			!isLoading && fetchScroll(page, perPage);
		}

	}, [isLoading, fetchScroll]);

	useEffect(() => {
		// Create an observer
		const observer = new IntersectionObserver(
			handleObserver, //callback
			{
				root: null, // Page as root
				rootMargin: "0px",
				threshold: 1.0
			}
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
							{users.map(user => <li key={Math.random() * 100}>{user.avalues}: {user.picked_at}</li>)}
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

const mapStateToProps = (state) => {
	const {isLoading, users, error, page} = state.scroll;
	return {
		isLoading,
		users,
		error,
		page
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ fetchScroll }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
