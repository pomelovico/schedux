/**
 * @class 
 * @description 一个日历类
 */
import {isLeapYear} from './utils.js';

/*每个月的天数*/
const monthDays = [
    [31,29,31,30,31,30,31,31,30,31,30,31],
    [31,28,31,30,31,30,31,31,30,31,30,31]
]
export default class Calender {
    constructor(str){
        this.date = new Date(str);
    }
    /*生成 5 * 7 的数组，对应一个月（包含上个月的最后几天和下个月的开头几天）*/
    genMonth(){
        let {date} = this;
        let y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDay(),
            arr = [],
            dateStr;
        for(let i=0;i<5;i++){
            if(i == 4 && !isLeapYear(y) && m == 1){
                dateStr = [y,m+1,28].join('-');
            }else{
                dateStr = [y,m+1,1+i*7].join('-');
            }
            arr.push(this.genWeekByTs(new Date(dateStr)));
        }
        return arr;
    }
    genWeek(date){
        date = date ? date : this.date;
        let y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate(),
            wd = date.getDay() == 0 ? 7 : date.getDay(),  // 1 ~ 7 周几
            arr = [],
            mDays = monthDays[isLeapYear(y) ? 0 : 1];/*每个月对应的天数*/
        if(d < wd){
            /*第一周，有上周的日期*/
            let lastMonthDays = mDays[(m + 11) % 12];
            let start = lastMonthDays - (wd -d) + 1;
            m == 0 && y--;
            while(start <= lastMonthDays){
                arr.push({
                    date:[y, m == 0 ? 12 : m, start++],
                    belong:'last'
                });
            };
            var i=1;
            var end = d + 7 - wd;
            while(i <= end){
                arr.push({
                    date:[y,m+1,i++],
                    belong:'current'
                });
            }
            
            return arr;
        }
        var last = (d + (7 - wd)) % mDays[m];
        if(last < d){
            /*一个月的最后一周，有下周的日期*/
            var start = d - wd + 1;
            while(start <= mDays[m]){
                arr.push({
                    date:[y,m+1,start++],
                    belong:'current'
                });
            };
            var i=1;
            m == 11 && y++;
            while(i<=last){
                arr.push({
                    date:[y,m==11 ? 1 : m + 2, i++],
                    belong:'next'
                })
            }
            
            return arr;
        }
        var s = d - wd + 1,
            e = d + 7- wd;
        while(s<=e){
            arr.push({
                date:[y,m+1,s++],
                belong:'current'
            })
        }
        
        return arr;
    }
    genWeekByTs(date){
        date = date ? date : this.date;
        let wd = date.getDay() == 0 ? 7 : date.getDay() ,
            d =  date.getDate(),
            cm = date.getMonth();
        let arr = [],
            startTs = date.getTime() - wd * 86400000;
        let i = 0,
            belong;
        while((i++)<7){
            var dd = new Date(startTs + 86400000 * i);
            var m = dd.getMonth();
            if((m < cm) || (cm ==0 && m ==11)){
                belong = 'last';
            }else if((m > cm) || (cm == 11 && m == 0)){
                belong = 'next';
            }else{
                belong = 'current';
            }
            arr.push({
                date:[dd.getFullYear(),m + 1,dd.getDate()],
                belong:belong
            })
        }
        
        return arr;
    }
    setDate(str){
        this.date = new Date(str);
    }
}
