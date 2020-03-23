import 'babel-polyfill';
import React from "react";
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import AboutTheComplex from './AboutTheComplex.jsx';
import Features from './Features.jsx';
import Penthouses from './Penthouses.jsx';
import ChooseAFlat from './ChooseAFlat.jsx';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.activeItemLineRef = React.createRef();

        this.changeURL();
    }

    changeURL = () => {
        const location = window.location.href.split('/');
        if (location[location.length -1] == '') {
            window.history.pushState(null, null, '/aboutthecomplex');
        }
    }

    componentDidMount() {
        this.defaultLinePosition();
        window.addEventListener('popstate', this.defaultLinePosition)
    }

    menuItemMouseOver = (num) => (e) => {
        if (e.target.tagName != 'A') return;

        const activeItemLine = this.activeItemLineRef.current;
        const activeItemNum = activeItemLine.dataset.itemnum;
        const menuItems = document.querySelectorAll('.menu__list__item');
        const menuLinks = document.querySelectorAll('.menu__list__item a');

        if (activeItemNum < num) {
            const rightNeedWidth = menuLinks[num].clientWidth + [...menuItems].reduce((acc, item, i) => {
                if (i > num - 1 || activeItemNum > i) return acc;
                return acc + item.clientWidth;
            }, 0);

            activeItemLine.style = `left: 0px; width: ${rightNeedWidth}px`;
        }

        if (activeItemNum > num) {
            const leftNeedWidth = menuLinks[num].clientWidth + [...menuItems].reduce((acc, item, i) => {
                if (i - 1 < num || i > activeItemNum) return acc;
                return acc + item.clientWidth;
            }, 0);
            
            activeItemLine.style = `right: 0px; width: ${leftNeedWidth}px`;
        }
    }

    menuItemMouseOute = () => {
        const activeItemLine = this.activeItemLineRef.current;
        activeItemLine.style.width = 100 + '%';
    }

    defaultLinePosition = () => {
        const menuLinks = document.querySelector('.menu__list .active');
        this.changeLinePosition(menuLinks.dataset.num) ();
    }

    changeLinePosition = (num) => () => {
        const activeItemLine = this.activeItemLineRef.current;
        const menuLinks = document.querySelectorAll('.menu__list__item a');

        this.menuItemMouseOute()
        activeItemLine.dataset.itemnum = num ? num : 0;
        menuLinks[num].append(activeItemLine);
    }

    render() {
        return(
        <BrowserRouter> 
            <div className="container">
                <header>
                    <div className='logo'>
                        <div className="left-block"></div>
                        <span className="logo__text">Первомайская</span>
                    </div>
                    <nav className='menu'>
                        <ul className="menu__list" onMouseOut={this.menuItemMouseOute}>
                            <li className="menu__list__item">
                                <NavLink to="/aboutthecomplex"
                                        onMouseOver={ this.menuItemMouseOver(0) }
                                        onClick={ this.changeLinePosition(0) }
                                        data-num='0'>
                                    О комплексе
                                    <div className="menu__active-line"
                                        style={ {left: '0px'} }
                                        ref={this.activeItemLineRef}
                                        data-itemnum="0">
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu__list__item">
                                <NavLink to="/features" 
                                        onMouseOver={ this.menuItemMouseOver(1) }
                                        onClick={ this.changeLinePosition(1) }
                                        data-num='1'>
                                    Особенности
                                </NavLink>
                            </li>
                            <li className="menu__list__item">
                                <NavLink to="/penthouses"
                                        onMouseOver={ this.menuItemMouseOver(2) }
                                        onClick={ this.changeLinePosition(2) }
                                        data-num='2'>
                                    Пентхаусы
                                </NavLink>
                            </li>
                            <li className="menu__list__item">
                                <NavLink to="/chooseaflat"
                                        onMouseOver = { this.menuItemMouseOver(3) }
                                        onClick = { this.changeLinePosition(3) }
                                        data-num='3'>
                                    Выбрать квартиру
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="phone-number">
                        <div className="right-block"><div></div></div>
                        <span className="phone-number__contacts">
                        8 888 888 88 88
                        </span>
                    </div>
                </header>
                <main>
                    <Route path="/aboutthecomplex" component={AboutTheComplex}/>
                    <Route path="/features" component={Features}/>
                    <Route path="/penthouses" component={Penthouses}/>
                    <Route path="/chooseaflat" component={ChooseAFlat}/>
                </main>
                <footer>
                Разработано в MST
                <span>|</span>
                2018
                </footer>
            </div>
        </BrowserRouter>
        )
    }
};