import { stringify } from 'qs'
import request from 'utils/request'
import { NOVA_DEFAULT_ROOT } from './config'

export const fetchBuilding = async () => request(`${NOVA_DEFAULT_ROOT}/building`)
