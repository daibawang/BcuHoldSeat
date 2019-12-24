import {getMonthDateNum} from '@/utils/formatTime.js'
const staDate ={
    'week':["","周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    // 'month':[...Array(getMonthDateNum()+1).keys()],
    'month':[],
    'year':[...Array(13).keys()]
} ;
const dayMap =["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export {
    dayMap,
    staDate
}