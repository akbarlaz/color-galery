import './CardItem.scss';
import React from 'react';
import { ColorObject } from '../custom-type';

type Props = {
    cardItemIndex: number;
    cardItemData: ColorObject;
    removeColor: (index: number) => void;
}

class CardItem extends React.Component<Props> {

    componentDidMount() {
        const input: HTMLDivElement = document.getElementById(`card-header-${this.props.cardItemIndex}`) as HTMLDivElement;
        input.style.setProperty("--card-color", this.props.cardItemData.value);
    }

    removeItem = (index: number) => {
        this.props.removeColor(index);
    }

    render() {
        return (
            <>
                <div className="grid-item card-item" key={this.props.cardItemIndex}>
                    <div id={`card-header-${this.props.cardItemIndex}`} className="card-header">
                    </div>
                    <div className="card-footer">
                        <div className="card-footer-text">
                            <span>{this.props.cardItemData.value}</span>
                        </div>
                        <div className="card-footer-icon">
                            <span onClick={() => this.removeItem(this.props.cardItemIndex)} className="clickable">{this.props.cardItemData.canRemove ? 'X' : ''}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CardItem;
