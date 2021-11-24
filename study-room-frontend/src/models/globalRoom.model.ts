import { fetchBuilding } from "services/building";
import { fetchStudyspace } from "services/studyspace";
export interface DibSpace {
  building_name: string;
  seats: Number;
  availability: string;
  study_space_id: string;
}
interface RoomState {
  spacesList: DibSpace[];
  searchKey: string;
}
const initState: RoomState = {
  spacesList: [],
  searchKey: undefined,
};
declare global {
  interface GlobalState {
    global_room: RoomState;
  }
}
export default <Model>{
  namespace: "global_room",
  state: initState,
  effects: {
    *fetchBuilding(_, { call, select }) {
     
      
      const { data } = yield call(fetchBuilding);
      console.log(data);
    },
    *fetchStudyspace(_, { call, put,select }) {
      const { searchKey } = yield select((state) => state.global_room);
      const { data } = yield call(fetchStudyspace,{searchKey});
      yield put({
        type: "save",
        payload: {
          spacesList: data,
        },
      });
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
