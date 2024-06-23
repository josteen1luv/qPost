import React from 'react';
import {Box} from "@mui/material";
import PostListItem from "../postListItem/postListItem";
import {useGetAllPostsQuery} from "../../api/post/postApiSlice";
import dayjs from 'dayjs';
import {IPost} from "../../models/IPost";

interface PostListProps {
	filterBy?: string, id?: number
}
const PostList = ({filterBy, id}: PostListProps) => {
	const {data} = useGetAllPostsQuery();
	const filter = (data: IPost[]) => {
		if (filterBy === 'owner'){
			console.log('owner')
			const owner = data.filter(item => item.owner.id === id);
			console.log(owner);
			return owner;
		}
		if (filterBy === 'likes'){
			console.log('likes')
			const likes = data.filter(item => item.likes.some(like => like.id === id));
			console.log(likes);
			return likes
		}
		return data;
	}

	const filteredData = data ? filter(data) : null;
	return (
		<Box>
			{filteredData && filteredData.map((item: IPost) => (
				<PostListItem
					key={item.id}
					nickname={item.owner.nickname}
					title={item.title}
					description={item.description}
					created={dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
					edited={item.createdAt === item.updatedAt ? null : ` (Edited at ${dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm')})`}
					id={item.id}
					userId={item.owner.id}
					likes={item.likes}
				/>
			))}
		</Box>
	);
};

export default PostList;