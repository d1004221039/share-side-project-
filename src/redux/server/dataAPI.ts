import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Pokemon } from "./types";

export type ProjectApiType = {
  id: string;
  avatarImg: string;
  name: string;
  title: string;
  abstract: string;
  featuredImg: string;
  date: string;
  hashTag: string[];
  peopleNum: string;
  hyperlink: string;
  userID: string;
};

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://share-side-project-data-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    DesignApi: builder.query<any, string>({
      query: (id) => {
        if (id == "all") {
          return `design/.json`;
        } else {
          return `design/${id}`;
        }
      },
    }),
    ProposalApi: builder.query<any, string>({
      query: (id) => {
        if (id == "all") {
          return `proposal/.json`;
        } else {
          return `proposal/${id}`;
        }
      },
    }),
    ProjectApi: builder.query<ProjectApiType[], string>({
      query: (id) => {
        if (id == "all") {
          return `project/.json`;
        } else {
          return `project/${id}`;
        }
      },
    }),
  }),
});

export const { useDesignApiQuery, useProposalApiQuery, useProjectApiQuery } =
  dataApi;
