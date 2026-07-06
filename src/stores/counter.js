import { defineStore} from "pinia";
export const useCounterstore=defineStore("counter",{
    state:()=>({
        count:0
    }),
    actions:
    {
        increment()
        {
            this.count++;
        }
    }
});