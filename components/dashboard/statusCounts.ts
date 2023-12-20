import { issuesTypeI } from "@/types/types";

export const statusCount = (datas:issuesTypeI[])=>{
    let open = 0;
    let close = 0;
    let process = 0;
    datas.map((data)=>{
        if(data.status==='Open') open++
        if(data.status==='Closed') close++
        if(data.status==='In Process') process++
    })
    return {open, close, process}
}
