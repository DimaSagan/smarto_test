"use strict"
// https://test.smarto.agency/smarto_complexes_list.json
export class GetDataService {
    async getData(url) {
        const result = await fetch(url)
        if(!result.ok){ throw new Error('[Get Data Service] - Failed to fetch data')}
       
        const data = await result.json() 
        console.log(data) 
        return data
    }
}
