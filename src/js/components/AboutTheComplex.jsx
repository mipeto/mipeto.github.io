import React from "react";
import { connect } from 'react-redux';
import * as actions from "../actions";

const mapStateToProps = (state) => ({
    pageNumber: state.pageNumber
})
const actionsCreater = {
    changePage: actions.changePage,
};

class AboutTheComplex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pages: {
                1 : {
                    name: 'Архитектура',
                    text: `Оригинальная архитектура жилого комплекса бизнес-класса 
                            «Первомайская» формирует современный стиль 
                            жизни [тексттекстекстексттексттекстекстексттекстте
                            кстекстексттексттекстекстекст]`,
                    img: "dist/img/аrchitecture.jpg"
                },
                2 : {name: null, text: null, img: null
                },
                3 : {
                    name: 'Безопастность',
                    text: `Современный двор европейского уровня — 
                            территория для детей, игр на свежем воздухе и 
                            вечерних [тексттекстекстексттексттекстекстексттекстте
                                кстекстексттексттекстекстекст]`,
                    img: 'dist/img/security.jpg'
                },
                4 : {
                    name: null, text: null, img: null
                },
                5 : {
                    name: null, text: null, img: null
                },
                6 : {
                    name: null, text: null, img: null
                }
            }
        }
    }

    componentDidMount() {
        this.eventTextAdaptive()
    }

    componentDidUpdate() {
        this.eventTextAdaptive();
    }

    eventTextAdaptive = () => {
        const informationBlock = document.querySelector('.about-the-complex__info__text span');

        if(informationBlock) {
            const text = informationBlock.textContent;
            window.onresize = ()=>{
                informationBlock.textContent = text;
                this.changeText(informationBlock);
            };

            this.changeText(informationBlock);
        }
    }

    changePage = (num) => () => {
        const { changePage } = this.props;
        changePage( {pageNum: num} );
    }

    changeText = (textBlock) => {
        const ellipsis = document.createElement('a');
        const ellips = document.createElement('span');

        ellipsis.href = '';
        ellipsis.classList.add('ellipsis');
        ellipsis.append(ellips);
        while ( !this.checkTextSize(textBlock) ) {
            const textArr = textBlock.textContent.split(' ');
            const text = textArr.slice(0, -1);
            textBlock.textContent = text.join(' ');
            textBlock.append(ellipsis);
        }
        return;
    }

    checkTextSize = (node, num = 3) => {
        const stringsQuantity = node.getClientRects().length;
        return num >= stringsQuantity;
    }

    renderPage = () => {
        const { pageNumber } = this.props;
        const { pages } = this.state;

        return <div className="about-the-complex__info">
                    <div className="about-the-complex__info__text">
                        { pages[pageNumber].name ? <h2>{pages[pageNumber].name}</h2> : null }
                        { pages[pageNumber].text ? <p><span>{pages[pageNumber].text}</span></p> : null }
                        <div className="about-the-complex__page-number">
                            {pageNumber}/6
                        </div>
                    </div>
                    <div className="about-the-complex__info__img">
                        { pages[pageNumber].img ? <img src={pages[pageNumber].img}/>: null }
                    </div>
                </div>;
    }
    render () {
        const { pageNumber } = this.props;
        const getClass = (num) => {
            if(pageNumber == num) {
                return "side-menu__item side-menu__item_active";
            }
            return "side-menu__item";
        }

        return (
        <section className='about-the-complex'>
            <aside className="side-menu">
                <ul className="side-menu__list">
                    <li onClick={ this.changePage('1') } 
                        className={ getClass(1) }>
                        <span>Архитектура</span>
                    </li>
                    <li onClick={this.changePage('2')} 
                        className={ getClass(2) }>
                        <span>Благоустройство</span>
                    </li>
                    <li onClick={ this.changePage('3') } 
                        className={ getClass(3) }>
                        <span>Безопастность</span>
                    </li>
                    <li onClick={ this.changePage('4') } 
                        className={ getClass(4) }>
                        <span>Инженерия</span>
                    </li>
                    <li onClick={ this.changePage('5') } 
                        className={ getClass(5) }>
                        <span>Инфраструктура</span>
                    </li>
                    <li onClick={ this.changePage('6') } 
                        className={ getClass(6) }>
                        <span>Транспортная доступность</span>
                    </li>
                </ul>
            </aside>
            { this.renderPage() }
        </section>)
    }
}
export default connect(mapStateToProps, actionsCreater) (AboutTheComplex);