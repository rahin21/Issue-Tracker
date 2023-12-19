import { issuesTypeI } from "@/types/types";

let open = 0;
let close = 0;
let process = 0;
export const statusCount = (datas:issuesTypeI[])=>{
    datas.map((data)=>{
        if(data.status==='Open') open++
        if(data.status==='Closed') close++
        if(data.status==='In Process') process++
    })
}
export {open, close, process}
