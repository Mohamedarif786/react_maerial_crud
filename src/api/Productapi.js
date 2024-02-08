import React from "react";
import { httpRequest } from "./axios";

export const create = async (data) => {
  const res = await httpRequest({
    url: "/Product",
    method: "POST",
    data: data,
  });
  return res;
};

export const getall_data = async () => {
  const res = await httpRequest({
    url: "/Product",
    method: "GET",
  });
  return res;
};

export const getFetchData = async (id) => {
  const res = await httpRequest({
    url: "/Product/" + id,
    method: "GET",
  });
  return res;
};

export const update = async (data,id) => {
  const res = await httpRequest({
    url: "/Product/" + id,
    method: "PUT",
    data:data
  });
  return res;
};


export const delete_api = async (id) => {
  const res = await httpRequest({
    url: "/Product/" + id,
    method: "DELETE",
  });
  return res;
};
