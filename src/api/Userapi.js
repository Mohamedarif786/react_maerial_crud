import React from "react";
import axios from "axios";
import { httpRequest } from "./axios";

export const create = async (data) => {
  const res = await httpRequest({
    url: "/users",
    method: "POST",
    data,
  });
  return res;
};

export const getall_data = async () => {
  const res = await httpRequest({
    url: "/users",
    method: "GET",
  });
  return res;
};

export const edit_api = async (id) => {
  const res = await httpRequest({
    url: "/users/" + id,
    method: "GET",
  });
  return res;
};

export const update_api = async (data, id) => {
  const res = await httpRequest({
    url: "/users/" + id,
    method: "PUT",
    data,
  });
  return res;
};

export const delete_api = async (id) => {
  const res = await httpRequest({
    url: "/users/" + id,
    method: "DELETE",
  });
  return res;
};
