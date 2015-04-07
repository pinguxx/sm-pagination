/*global require, window, module*/
var m = window.m || require("mithril/mithril");

var Pagination = m.component({
    controller: function (args) {
        var pagination = this;
        pagination.data = args.data;
        pagination.currentpage = pagination.oldpage || pagination.currentpage || 1;
        pagination.pages = Math.ceil(args.data.length / args.rowsperpage);
        if (pagination.currentpage > pagination.pages) {
            pagination.oldpage = pagination.currentpage;
            pagination.currentpage = pagination.pages;
        } else {
            pagination.oldpage = null;
        }
        pagination.latest = (args.rowsperpage * pagination.currentpage) - args.rowsperpage;
        pagination.rowsperpage = args.rowsperpage;
        //pagination.classes = args.clazobj;
        pagination.pagerender = args.pagerender;
        pagination.wrapperclass = args.wrapperclass;
        pagination.classes = {
            leftIconClass : args.classes ? (args.classes.leftIconClass || 'left arrow icon') : 'left arrow icon',
            rightIconClass : args.classes ? (args.classes.rightIconClass || 'right arrow icon') : 'right arrow icon',
            iconItemClass : args.classes ? (args.classes.iconItemClass || 'icon item') : 'icon item',
            disabledClass : args.classes ? (args.classes.disabledClass || 'disabled') : 'disabled',
            menuClass : args.classes ? (args.classes.menuClass || 'ui pagination menu small') : 'ui pagination menu small'
        };
        pagination.goToPage = function (pageNumber) {
            m.startComputation();
            this.currentpage = pageNumber;
            m.endComputation();
        };
        pagination.buildNumbers = function () {
            var numbers = [],
                pagination = this,
                i,
                activeClass = pagination.classes ? (pagination.classes.activeClass || 'active') : 'active',
                itemClass = pagination.classes ? (pagination.classes.itemClass || 'item') : 'item';
            //:( super ugly code for pagination
            function renderNumber(i, next, text, claz, withClick) {
                return m("a", {
                    'class': itemClass + ' ' + (!withClick ? claz : ''),
                    onclick: withClick ? function (e) {
                        e.preventDefault();
                        pagination.goToPage(next);
                    } : {}
                }, text);
            }

            if (pagination.pages > 7) {
                for (i = 1; i <= pagination.pages; i += 1) {
                    if (pagination.currentpage < 4) {
                        if (i > 5) {
                            if (i > 7) {
                                continue;
                            }
                            numbers.push(renderNumber(i, (6 === i ? (pagination.currentpage + 4) : pagination.pages), (6 === i ? '...' : pagination.pages), '', true));
                            continue;
                        }
                        numbers.push(renderNumber(i, i, i, activeClass, pagination.currentpage !== i));
                    } else if (pagination.currentpage > 3 && pagination.currentpage <= pagination.pages - 4) {
                        if (i < 3) {
                            numbers.push(renderNumber(i, (2 === i ? (pagination.currentpage - 4) : i), (2 === i ? '...' : 1), '', true));
                            continue;
                        }
                        if (i < pagination.currentpage - 1 || (i > pagination.currentpage + 1 && i <= pagination.pages - 2)) {
                            continue;
                        }
                        if (i >= pagination.pages - 2) {
                            numbers.push(renderNumber(i, (pagination.pages - 1 === i ? (pagination.currentpage + 4) : i), (pagination.pages - 1 === i ? '...' : i), '', true));
                            continue;
                        }
                        numbers.push(renderNumber(i, i, i, activeClass, pagination.currentpage !== i));
                    } else if (pagination.currentpage > pagination.pages - 4) {
                        if (i < 3) {
                            numbers.push(renderNumber(i, (2 === i ? (pagination.currentpage - 4) : i), (2 === i ? '...' : 1), '', true));
                            continue;
                        }
                        if (i >= pagination.pages - 4) {
                            numbers.push(renderNumber(i, i, i, activeClass, pagination.currentpage !== i));
                        }
                    }
                }
            } else {
                for (i = 1; i <= pagination.pages; i += 1) {
                    numbers.push(renderNumber(i, i, i, activeClass, pagination.currentpage !== i));
                }
            }
            return numbers;
        };
    },
    view: function (ctrl) {
        var pagination = ctrl;
        if (pagination.pages < 2) {
            return m('div', {
                class: pagination.wrapperclass || 'ui grid'
            }, [
                ctrl.pagerender([]),
                m('div')
            ]);
        }
        var to = (pagination.rowsperpage * pagination.currentpage);
        pagination.latest = (pagination.rowsperpage * pagination.currentpage) - pagination.rowsperpage;
        return m('.ui.grid', [
            ctrl.pagerender(pagination.data.slice(pagination.latest, pagination.rowsperpage * pagination.currentpage)),
            m('p', {
                    style: 'text-align:center;margin-top:10px;',
                }, [
                m('p', (pagination.latest + 1) +
                        ' - ' +
                        (to <= pagination.data.length ? to : pagination.data.length) +
                        ' of ' + pagination.data.length
                ),
                m("div", {
                    class: pagination.classes.menuClass
                }, [
                    m("a", {
                            'class': pagination.classes.iconItemClass + ' ' + (pagination.currentpage < 2 ? pagination.classes.disabledClass : ''),
                            onclick: pagination.currentpage < 2 ? {} : function (e) {
                                e.preventDefault();
                                pagination.goToPage((pagination.currentpage - 1) || 1);
                            }
                        }, [
                        m("i", {
                            class: pagination.classes.leftIconClass
                        })
                    ]),
                    pagination.buildNumbers(),
                    m("a", {
                            'class': pagination.classes.iconItemClass + ' ' + (pagination.currentpage >= pagination.pages ? pagination.classes.disabledClass : ''),
                            onclick: pagination.currentpage >= pagination.pages ? {} : function (e) {
                                e.preventDefault();
                                pagination.goToPage(pagination.currentpage + 1);
                            }
                        }, [
                        m("i", {
                            class: pagination.classes.rightIconClass
                        })
                    ])
                ])
            ])
        ]);
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Pagination;
}
