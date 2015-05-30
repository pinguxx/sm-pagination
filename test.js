/*global m, Pagination, window*/
'use strict';
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

    function list(data) {
        return m('.ui.segment.sixteen.wide.column', [
            m('ul.ui.bulleted.list', data.map(function (item) {
                return m('li', {
                    key: item.id
                }, item.name);
            }))
        ]);
    }

    function table(data) {
        return m('.ui.sixteen.wide.column', [
            m('table.ui.table', [
                m('tbody', data.map(function (item) {
                    return m('tr', {
                        key: item.id
                    }, [
                        m('td', item.id),
                        m('td', item.name)
                    ]);
                }))
            ])
        ]);
    }

    module.controller = function () {
        module.vm.init();
        this.pagination = m.component(Pagination, {
            data: module.vm.data,
            rowsperpage: module.vm.rowsperpage,
            pagerender: list,
            wrapperclass: 'column'
        });
        this.paginationCtrl = new this.pagination.controller();
    };

    module.vm = {};
    module.vm.init = function () {
        this.data = array;
        this.rowsperpage = 10;
        this.page = m.prop(3);
    };


    module.view = function (ctrl) {
        return m('.ui.grid.page.one.column', [
            m('h1', 'Pagination'),
            m.component(Pagination, {
                data: module.vm.data,
                rowsperpage: module.vm.rowsperpage,
                pagerender: list,
                wrapperclass: 'column',
                page: module.vm.page,
                classes: {
                    leftIconClass: 'glyphicon glyphicon-arrow-left',
                    rightIconClass: 'glyphicon glyphicon-arrow-right'
                }
            }),
            m.component(Pagination, {
                data: module.vm.data,
                rowsperpage: module.vm.rowsperpage,
                pagerender: table,
                wrapperclass: 'column',
                classes: {
                    leftIconClass: 'left arrow icon',
                    rightIconClass: 'right arrow icon'
                }
            }),
            m('.row', [
                m('.column', [
                    m('br')
                ])
            ]),
            ctrl.pagination.view(ctrl.paginationCtrl),
            m('.row', [
                m('.column', [
                    m('button.ui.button', {
                        onclick: function () {
                            module.vm.data.splice(30, 10);
                            ctrl.paginationCtrl.goToPage(4);
                            module.vm.page(4);
                        }
                    }, 'go to page 3')
                ])
            ])
        ]);
    };

    m.mount(window.document.body, module);
}(m, Pagination));
