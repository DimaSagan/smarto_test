"use strict"

export class CardRender {
    constructor(containerSelector, loadMoreSelector, step = 3) {

        this.container = document.querySelector(containerSelector)

        this.loadMoreButton = document.querySelector(loadMoreSelector)

        this.allCards = []

        this.visibleCount = 0

        this.step = step

        this.loadMoreButton.addEventListener('click', ()=>{this.renderMore()})
        
    }

    init(cards) {
        this.allCards = cards

        this.visibleCount = 0

        this.container.innerHTML = ''

        this.renderMore()
    }

    renderMore() {
        const nextCards = this.allCards.slice(this.visibleCount, this.visibleCount + this.step)

        nextCards.forEach(card => {
            // const div = document.createElement('div')
            // div.className = 'card'
            // div.innerHTML = `
            //     <img src="${card.img}">
            //     <h3>${card.name}</h3>
            // `
            this.container.appendChild(this.cardConstructor(card))
        })

        this.visibleCount += this.step

        // if (this.visibleCount >= this.allCards.length) {
        //     this.loadMoreBtn.style.display = 'none';
        // }
    }

    cardConstructor(card) {
        const div = document.createElement('div')
        div.className = 'card'
        // card header
        const cardHeader = document.createElement('div')
        cardHeader.classList.add("card__header", "header-card");
        const headerCardYear = document.createElement('div')
        headerCardYear.className = "header-card__year"
        headerCardYear.textContent = card.year + " р."
        const headerCardType = document.createElement('div')
        headerCardType.className ="header-card__type"
        headerCardType.textContent = card.type
        cardHeader.append(headerCardYear, headerCardType)
        // --------------
        // card image
        const cardImage = document.createElement('div')
        cardImage.className = 'card__image'
        const img = document.createElement('img')
        img.src = card.img
        img.alt = card.name
        const title = document.createElement('h3')
        title.className = 'card__title'
        title.textContent = card.name
        cardImage.append(img, title)
        // --------------
        // card subtitle
        const cardSubtitle = document.createElement('h4')
        cardSubtitle.className = 'card__subtitle'
        cardSubtitle.textContent = card.adress
        // card footer. footer-card
        const cardFooter = document.createElement('div')
        cardFooter.classList.add("card__footer", "footer-card")
        const footerCardTitle = document.createElement('h4')
        footerCardTitle.className = 'footer-card__title'
        footerCardTitle.textContent = 'види робіт'
        const footerCardItems = document.createElement('div')
        footerCardItems.className = 'footer-card__items'
        this.tagsGenerator(card.tags, footerCardItems)
        cardFooter.append(footerCardTitle, footerCardItems)
        // --------------
        // svg
        const SVG_NS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.classList.add('card__bottom');
        const use = document.createElementNS(SVG_NS, 'use');
        use.setAttribute('href', 'img/sprite.svg#test');
        svg.appendChild(use);
        // --------------
        // pin
        const pin = document.createElement('div')
        pin.className = 'card__pin'
        const pinImg = document.createElement('img')
        pinImg.src = 'img/pin.svg'
        pin.append(pinImg)
        div.append(cardHeader, cardImage, cardSubtitle, cardFooter, svg, pin)
        return div
    }

    tagsGenerator(tags, footerCardItems) {
        for (const tag of tags) {
            const div = document.createElement('div')
            div.textContent = tag
            footerCardItems.appendChild(div)
        }
    }
}

