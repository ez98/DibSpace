import moment from "moment";
import {setReservation,fetReservationById} from 'services/reservation'
export interface Reserve {
  spaceId: string;
  reserveDate: string;
  reserveHour: number;
  reserveMinute: string;
  reservePeriod: string;
  studyHour: number;
  studyMinutes: string;
}
export interface ReserveForm {
  reserveForm: Reserve;
}
const initState: ReserveForm = {
  reserveForm: {
    spaceId: undefined,
    reserveDate: undefined,
    reserveHour: undefined,
    reserveMinute: undefined,
    reservePeriod: undefined,
    studyHour: undefined,
    studyMinutes: undefined,
  },
};
declare global {
  interface GlobalState {
    reserve: Reserve;
  }
}
export default <Model>{
  namespace: "reserve",
  state: initState,
  effects: {
    *fetReservationById({payload},{call}){
      const {data}=yield call(fetReservationById,payload.id)
      return data
      
    },
    *setReserveInfo(_, { call, select }) {
      const { reserveForm } :ReserveForm = yield select(
        (state) => state.reserve
      );
      const start_time=`${reserveForm.reserveDate} ${reserveForm.reserveHour}:${reserveForm.reserveMinute}:00`

      const body={
        start_time:moment(start_time).toISOString(),
        end_time:moment(start_time).add(reserveForm.studyHour,"hours").add(reserveForm.studyMinutes,"minutes").toISOString(),
        study_space_id:reserveForm.spaceId,
        student_id:1,
        reservation_id:moment().format("YYYYMMDDHHmmss")
      }      
      const {data}=yield call(setReservation,body)
      return data
      
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
