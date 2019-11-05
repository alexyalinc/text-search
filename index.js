class FindInput {
    constructor(input, className) {
        //Register global variables
        this.input = input;
        this.className = className;
        //Save contents to variables
        this.getContents();
        //Add event to input
        this.addEvent();
    }

    //Add event to input search
    addEvent() {
        this.input.addEventListener('input', e => this.eventFind(e));
    }

    //Event function
    eventFind(e) {
        const searchText = e.target.value;
        for(let i=0; i < this.contentsElements.length; i++) {
            let htmlContent = this.defaultHtmlContents[i];
            //if text empty
            if(searchText.length === 0) {
                this.contentsElements[i].innerHTML = htmlContent;
                continue;
            }
            const regExp = new RegExp(searchText,'img');
            const replaceHtmlFunction = (text) => `<span class="found">${text}</span>`;

            this.contentsElements[i].innerHTML = htmlContent.replace(regExp, replaceHtmlFunction);
        }
    }

    getContents() {
        this.defaultHtmlContents = [];
        //get elements by class name
        this.contentsElements = document.getElementsByClassName(this.className);
        for(const content of this.contentsElements) {
            //save default inner html
            this.defaultHtmlContents.push(content.innerHTML);
        }
    }

}

const input = document.getElementById('findInput');

//init script
new FindInput(input, 'find-this');