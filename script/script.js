"use strict"
import { App } from './app.js'
import {mockDataResidential, mockDataSport, mockDataPublic} from './mock.js'
import './swiper.js'
document.addEventListener('DOMContentLoaded', () => {


    
    const app = new App('https://test.smarto.agency/smarto_complexes_list.json', '.tabs__content' ,'.load-more', mockDataResidential, mockDataSport, mockDataPublic)
    app.init()

    
})


