import { stringify } from 'qs'
import request from 'utils/request'
import { NOVA_DEFAULT_ROOT } from './config'

export const fetchStudyspace= async (query: any) => request(`${NOVA_DEFAULT_ROOT}/studyspace?${stringify(query)}`)
