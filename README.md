# Vea
### Virtual Element Adder

#### Feel free to update this module.
#### Using this module
##### You can install this module by importing it ``` import Vea from ".../Modules/Vea.js"; ```
  You will need to use jquery.
  If you have used D3.js your in luck, this module is wery simulart to use.
  If you have not used D3.js then:
#### This module will give you the possibility to add html elements using smaller syntax then adding html using the jquery append method
##### Normaly
  ```
    let bodyLinks = `
    <div class="new-body">
      <ul class="link-list">
        <li class="links"><a href="#">new Link</a></li>
      </ul>
    </div>
   `;
    $('body').append(bodyLinks);
  ```
##### Using Vea
  ```
    (new Vea()).select('body').append('div').addClass('new-body')
      .append('ul').addClass('link-list')
      .append('li').addClass('links')
      .append('a').addAttr('href', '#').text('new Link').enter();
  ```
  
MIT License

Copyright 2020 Rati Avaliani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
