import {fetchBuilding} from "services/building"
import {fetchStudyspace} from "services/studyspace"
export interface DibSpace{
	building_name:string
	seats:Number
	availability:string
	study_space_id:string
}
interface RoomState{
    spacesList:DibSpace[]
}
const initState:RoomState={
    spacesList: [],

}
declare global {
	interface GlobalState {
		global_room: RoomState
	}
}
export default <Model>{
	namespace: 'global_room',
	state: initState,
	effects: {
		*fetchBuilding(_,{call}){
			const {data}=yield call(fetchBuilding)
			console.log(data);
			
		},
		*fetchStudyspace(_,{call,put}){
			const {data}=yield call(fetchStudyspace)
			yield put({
				type: 'save',
				payload: {
					spacesList: data,
				},
			})			
		}
    },
    reducers: {
		save(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
	},

}