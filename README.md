# sm-pagination

Basic pagination for mithril and semantic

It requires mithril and semantic-ui-menu

Pagination file can be used with any common.js it is expect for mithril to be in global (m variable) or it will attempt to load it with `require('mithril')`, [webpack](http://webpack.github.io/docs/) its recommended


## Code Example

See complete code in test.html/js

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.10.3/semantic.min.css">
    <script src="bower_components/mithril/mithril.js"></script>
    <script src="Pagination.js"></script>
</head>
<body>
    
    <script src="test.js"></script>
</body>
</html>

```

```JavaScript

module.controller = function () {
    pagination = new Pagination();
    module.vm.init();
};

module.vm = {};
module.vm.init = function () {
    this.data = array;
    this.rowsperpage = 10;
};
function list(data) {
    pagination.calculatePagination(data, module.vm.rowsperpage);
    var cdata = data.slice(pagination.latest, pagination.rowsperpage * pagination.currentpage);
    return cdata.map(function (item) {
        return m('li', item.name);
    });
}
module.view = function (/*ctrl*/) {
    return m('.ui.grid.page', [
        m('h1', 'Pagination'),
        m('.ui.segment.sixteen.wide.column', [
            m('ul.ui.bulleted.list', list(array))
        ]),
        pagination.buildPagination()
    ]);
};

m.module(window.document.body, module);
```

## Attributes

It accepts the following properties

 * data, array of data to paginate
 * rowsperpage, # of rows to show each page
 * class object map with:
    * **activeClass**, applied to the active icons, defaults `active`
    * **itemClass**, applied to non icon items, defaults `icon`
    * **leftIconClass**, applied to the left arrow icon item, defaults `left arrow icon`
    * **rightIconClass**, applied to the right arrow icon item, defaults `right arrow icon`
    * **iconItemClass**, applied to the icon item items, defaults `icon item`,
    * **disabledClass**, applied to disaled items, defaults `disabled`
    * **menuClass**, applied to the menu pagination parent div, defaults `ui pagination menu small`