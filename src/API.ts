/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id?: string,
  name?: string,
  description?: string | null,
};

export type TodosQuery = {
  todos?:  Array< {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
  } | null > | null,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
  } | null,
};
