import {MutationTrigger} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {MutationDefinition} from "@reduxjs/toolkit/query";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {AxiosBaseQueryArgs} from "../api/api";

export type CreatePostAction = MutationTrigger<MutationDefinition<
	{title: string, description: string},
	BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown, {}, {}>,
	"Post" | "User",
	void,
	"authApi">>