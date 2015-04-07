/*global m, Pagination, window*/
(function (m, Pagination) {
    var array = [],
        i,
        module = {};

    for (i = 0; i < 100; i += 1) {
        array.push({
            id: i,
            name: 'name ' + i
        });
    }

    module.controller = function () {
        module.vm.init();
        this.pagination = Pagination({
            data: module.vm.data,
            rowsperpage: module.vm.rowsperpage,
            pagerender: list,
            wrapperclass: 'ui grid page'
        });
        this.paginationCtrl = new this.pagination.controller();
    };

    module.vm = {};
    module.vm.init = function () {
        this.data = array;
        this.rowsperpage = 10;
    };

    function list(data) {
        //pagination.controller.calculatePagination(data, module.vm.rowsperpage);
        //var cdata = data.slice(pagination.latest, pagination.rowsperpage * pagination.currentpage);
        return m('.ui.segment.sixteen.wide.column', [
            m('ul.ui.bulleted.list', data.map(function (item) {
            return m('li', item.name);
            }))
        ]);
    }

    function table(data) {
        //pagination2.calculatePagination(data, module.vm.rowsperpage);
        //var cdata = data.slice(pagination2.latest, pagination2.rowsperpage * pagination2.currentpage);
        return m('.ui.sixteen.wide.column', [
            m('table.ui.table', [
                m('tbody', data.map(function (item) {
                    return m('tr', [
                        m('td', item.id),
                        m('td', item.name)
                    ]);
                }))
            ])
        ]);
    }

    module.view = function (ctrl) {
        return m('.ui.grid.page', [
            m('h1', 'Pagination'),
            Pagination({
                data: module.vm.data,
                rowsperpage: module.vm.rowsperpage,
                pagerender: list,
                wrapperclass: 'ui grid page'
            }),
            Pagination({
                data: module.vm.data,
                rowsperpage: module.vm.rowsperpage,
                pagerender: table,
                wrapperclass: 'ui grid page'
            }),
            ctrl.pagination.view(ctrl.paginationCtrl)
        ]);
    };

    m.mount(window.document.body, module);
}(m, Pagination));
