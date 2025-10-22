"use strict"
import { GetDataService } from './getData.js'
import { CardRender } from './cardRender.js'

// export class App {
//     constructor(url, containerSelector, loadMoreSelector) {
//         this.api = new GetDataService()
//         this.ui = new CardRender(containerSelector, loadMoreSelector)
//         this.url = url
//     }

//     async init() {
//         try {
//             const data = await this.api.getData(this.url)

//             this.ui.init(data)
//         } catch (error) {
//             console.error('Initialization error', error)
//         }
//     }
// }

export class App {
    constructor(url, containerSelector, loadMoreSelector, residential, sport, publicBuild) {
        this.api = new GetDataService()
        this.ui = new CardRender(containerSelector, loadMoreSelector)
        this.url = url
        this.sport = sport
        this.publicBuild = publicBuild
        this.residential = residential
        this.allBuilding = []
    }

    async init() {
        try {
            const data = await this.api.getData(this.url)
            this.residential = [...this.residential, ...data]
            this.allBuilding = [
                ...(this.sport || []),
                ...(this.publicBuild || []),
                ...(this.residential || []),
            ]
            
            this.ui.init(this.allBuilding)
            this.initTabs()
        } catch (error) {
            console.error('Initialization error', error)
        }
    }

    initTabs() {
        const nav = document.querySelector('.tabs__navigation')
        const tabs = nav.querySelectorAll('li')
        nav.addEventListener("click", (e) => {
            if (e.target.tagName === 'LI') {
                const type = e.target.dataset.buildings

                tabs.forEach(tab => tab.classList.remove('active'))
                e.target.classList.add('active')

                let dataToShow = []

                switch (type) {
                    case 'residential':
                        dataToShow = this.residential
                        break
                    case 'public':
                        dataToShow = this.publicBuild
                        break
                    case 'sport':
                        dataToShow = this.sport
                        break
                    default:
                        dataToShow = this.allBuilding
                }
                this.ui.init(dataToShow)
            }
        })
    }

}