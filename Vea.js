export default class Vea {

    /*
    * virtual elements array
    */
    virtualElements        = [];

    /*
    * This number (index) makes the current element addable to attr, class... methods
    */
    currentElementIndex = -1;

    /*
    * Saves DOM element too add other elements
    */
    appendToElement     = null;

    static defaultIndex = "default_vea_index";

    /*
    * This method tests if the element witch we add other elements to is set
    */
    selectError () {
       if (this.appendToElement === null) throw new Error('No element was selected to use.');
    }

    /*
    * @param null elementName
    * @return this
    * Using this method main element can be selected and saved
    */
    select (elementName=null) {
        if (elementName === null || typeof elementName !== 'string') throw new Error('Passed element name is null or not a string.');
        this.appendToElement = $(elementName);

        return this;
    }

    /*
    * @param null revers
    * @return iterator[Symbol.iterator]()
    * This iterator selects saved elements and adds them to one sting based on order
    */
    init (revers=null) {
         let elementsLength = this.virtualElements.length-1;
         let count = revers === null ? 0 : elementsLength;

         let iterator =
             {
                 [Symbol.iterator] : () => {
                     return {
                         next: () => {

                            if (count > elementsLength) {
                                revers = true;
                                count = elementsLength;
                            }

                            if (count < 0){
                                return { 'done' : true};
                            }

                            let currentElement = this.virtualElements[count];

                            if (revers === null) {
                                let content = currentElement['start'] + currentElement['content'];
                                if (currentElement['child'] === false) content += currentElement['end'];

                                return {
                                    'done'  : false,
                                    'value' : content,
                                    'count' : count++
                                }
                            } else {
                                return {
                                    'done'  : this.virtualElements[count-1] === undefined ? true : false,
                                    'value' : currentElement['child'] === false ? "" : this.virtualElements[count]['end'],
                                    'count' : count--
                                }
                            }
                            return { 'done' : true }
                         }
                     }
                 }
             };

         return iterator[Symbol.iterator]();
    }

    /*
    *   This element will reset element list, Will remove saved elements
    */
    reset () {
        this.appendToElement.find(`.${Vea.defaultIndex}`).remove();
        return this;
    }

    /*
    * Adding enter to list of methods will run the init iterator and add the content(html) to main element
    */
    enter () {
        let load = this.init();
        let content = load.next();
        let html = content['value'];

        while (content['done'] != true) {
            content = load.next();
            html += content['value'];
        }

        this.appendToElement.append(`${html}`);
    }

    /*
    * This method will add end tags to elements
    */
    endElement () {
        this.virtualElements[this.currentElementIndex]['child'] = false;

        return this;
    }

    /*
    *  @param null listOfElements
    *  @return this
    *  You can add multiple elements
    */
    appendArray (listOfElements=null) {
         if (listOfElements === null) throw new Error('Passed element list is empty or not a object.');

         for (let element of listOfElements) {
             let defaultEntry = {
                 'start'   : `<${element['element']}>`,
                 'end'     : `</${element['element']}>`,
                 'child'   : element['child'],
                 'content' : element['content']
             };

             this.virtualElements.push(defaultEntry);
         }

         return this;
    }

    /*
    * @param null elementName, true child
    * @return this
    * Using this method you can append elements using only name of tag
    */
    append (elementName=null, child=true) {
        if (elementName === null || typeof elementName !== 'string') throw new Error('Passed element name is null or not a string.');
        this.selectError();
        this.currentElementIndex++;

        let defaultEntry = {
            'start'   : `<${elementName}>`,
            'end'     : `</${elementName}>`,
            'child'   : child,
            'content' : ""
        };

        this.virtualElements.push(defaultEntry);

        return this;
    }

    /*
    * @param null className
    * @return this
    * Using this method you can add classes but call it only once
    */
    addClass (className=null) {
        if (className === null || typeof className !== 'string') throw new Error('Passed element name is null or not a string.');
        this.selectError();

        let startElement = this.virtualElements[this.currentElementIndex]['start'];
        if (startElement.indexOf('class="') !== -1) throw new Error('AddClass can\'t be used tow times, you need to add all of the classes in one.');

        startElement = startElement.slice(0, startElement.length-1);

        this.virtualElements[this.currentElementIndex]['start'] = `${startElement} class="${className} ${Vea.defaultIndex}">`;
        return this;
    }

    /*
    * @param null attr, null attrContent
    * @return this
    * Using this method you can add attributes to elements
    */
    addAttr (attr=null, attrContent=null) {
        if (attr === null || typeof attr !== 'string' || attrContent === null || typeof attrContent !== 'string') throw new Error('Passed element name is null or not a string.');
        this.selectError();

        let startElement = this.virtualElements[this.currentElementIndex]['start'];
        if (startElement.indexOf(`${attr}="`) !== -1) throw new Error('Using the same attr tow times is\'t possible, use only one call to add unique attr.');

        startElement     = startElement.slice(0, startElement.length-1);

        this.virtualElements[this.currentElementIndex]['start'] = `${startElement} ${attr}="${attrContent}">`;

        return this;
    }

    /*
    * @param null content
    * @return this
    * Using this element you can add text content to the element
    */
    text (content=null) {
        if (content === null || typeof content !== 'string') throw new Error('Passed element name is null or not a string');
        this.selectError();

        this.virtualElements[this.currentElementIndex]['content'] = content;

        return this;
    }
}