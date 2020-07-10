# Vea
### Virtual Element Adder

#### Using this module
##### You can install this module by importing it ``` import Vea from ".../Modules/Vea.js"; ```
  You will need to use jquery.
  If you have used D3.js your in luck, this module is wery simulart to use.
  If you have not used D3.js then:
#### This module will give you the possibility to add html elements using smaller syntax then adding html using the jquery append method.
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
##### Using this module
  ```
    (new Vea()).select('body').append('div').addClass('new-body')
      .append('ul').addClass('link-list')
      .append('li').addClass('links')
      .append('a').addAttr('href', '#').text('new Link').enter();
  ```
