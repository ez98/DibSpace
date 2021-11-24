import moment from "moment";
import {setReservation,fetReservationById,fetReservationByStudent,postReservationByStudent} from 'services/reservation'
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
  reserveList:[]
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
  reserveList:[]
};
declare global {
  interface GlobalState {
    reserve: ReserveForm;
  }
}
export default <Model>{
  namespace: "reserve",
  state: initState,
  effects: {
    *postReservationByStudent({payload},{call}){
      const {data}=yield call(postReservationByStudent,payload)
      return data
    },
    *fetReservationByStudent(_,{call,put}){
      const {data}=yield call(fetReservationByStudent)
      yield put({
        type:'save',
        payload:{
          reserveList:data,
        }
      })
      
    },
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
