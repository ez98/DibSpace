import request from "utils/request";
import { NOVA_DEFAULT_ROOT } from "./config";

export const setReservation = async (body: any) =>
  request(`${NOVA_DEFAULT_ROOT}/reservation`, {
    method: "POST",
    body,
  });
export const fetReservationById = (id: number) =>
  request(`${NOVA_DEFAULT_ROOT}/reservation/${id}`);
export const fetReservationByStudent = () =>
  request(`${NOVA_DEFAULT_ROOT}/fetch-reserve-by-student`);
export const postReservationByStudent = (body: any) =>
  request(`${NOVA_DEFAULT_ROOT}/fetch-reserve-by-student`, {
    method: "POST",
    body,
  });
