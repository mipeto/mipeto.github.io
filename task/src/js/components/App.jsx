import 'babel-polyfill';
import React from "react";
import {BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import AboutTheComplex from './AboutTheComplex.jsx';
import Features from './Features.jsx';
import Penthouses from './Penthouses.jsx';
import ChooseAFlat from './ChooseAFlat.jsx';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            menu : [
                {text: 'О комплексе', link: '/aboutthecomplex'},
                {text: 'Особенности', link: '/features'},
                {text: 'Пентхаусы', link: '/penthouses'},
                {text: 'Выбрать квартиру', link: '/chooseaflat'}
            ]
        }

        this.activeItemLineRef = React.createRef();
    }

    componentDidMount() {
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

    getLinks = () => {
        const {menu} = this.state;
        const activeLine = (<div className="menu__active-line"
                                style={ {left: '0px'} }
                                ref={this.activeItemLineRef}
                                data-itemnum="0">
                            </div>);

        return <ul className="menu__list" onMouseOut={this.menuItemMouseOute}>
            {menu.map((item, i) => {
                return (
                    <li className="menu__list__item" key={i}>
                        <NavLink to={`${item.link}`}
                                onMouseOver={ this.menuItemMouseOver(i) }
                                onClick={ this.changeLinePosition(i) }
                                data-num={`${i}`}>
                            {item.text}
                            {i == 0 ? activeLine : null}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
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
                        {this.getLinks()}
                    </nav>
                    <div className="phone-number">
                        <div className="right-block"><div></div></div>
                        <span className="phone-number__contacts">
                        8 888 888 88 88
                        </span>
                    </div>
                </header>
                <main>
                <Switch>
                    <Route path="/aboutthecomplex" component={AboutTheComplex}/>
                    <Route path="/features" component={Features}/>
                    <Route path="/penthouses" component={Penthouses}/>
                    <Route path="/chooseaflat" component={ChooseAFlat}/>
                    <Redirect from='/' to="/aboutthecomplex" />
                </Switch>                  
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