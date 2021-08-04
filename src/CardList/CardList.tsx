import './CardList.scss';
import React from 'react';
import CardItem from '../CardItem/CardItem';
import { ColorObject } from '../custom-type';

type Props = {
    listOfColor: ColorObject[];
    removeColor: (index: number) => void;
}

type State = {
    listOfColor: ColorObject[];
}

class CardList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            listOfColor: this.props.listOfColor
        };
    }

    render() {
        return (
            <div className="card-list" >
                {this.state.listOfColor.map((el, index) => <CardItem key={index} cardItemData={el} cardItemIndex={index} removeColor={this.props.removeColor} />)}
            </div>
        );
    }
}

export default CardList;
