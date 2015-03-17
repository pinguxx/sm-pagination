/*global m, Pagination, window*/
(function (m, Pagination) {
    var array = [],
        i,
        pagination,
        pagination2,
        module = {};

    for (i = 0; i < 100; i += 1) {
        array.push({
            id: i,
            name: 'name ' + i
        });
    }

    module.controller = function () {
        pagination = new Pagination();
        pagination2 = new Pagination();
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

    function table(data) {
        pagination2.calculatePagination(data, module.vm.rowsperpage);
        var cdata = data.slice(pagination2.latest, pagination2.rowsperpage * pagination2.currentpage);
        return cdata.map(function (item) {
            return m('tr', [
                m('td', item.id),
                m('td', item.name)
            ]);
        });
    }

    module.view = function (/*ctrl*/) {
        return m('.ui.grid.page', [
            m('h1', 'Pagination'),
            m('.ui.segment.sixteen.wide.column', [
                m('ul.ui.bulleted.list', list(array))
            ]),
            pagination.buildPagination(),
            m('.ui.sixteen.wide.column', [
                m('table.ui.table', [
                    m('tbody', [
                        table(array)
                    ])
                ]),
            ]),
            pagination2.buildPagination(),
            m('.ui.segment.basic', 'hola')
        ]);
    };

    m.module(window.document.body, module);
}(m, Pagination));
