import './FilteringColorForm.scss';
import React from 'react';

type Props = {
    sortChange: (selectedSort: string[]) => void
}

type State = {
    selectedSort: string[]
}

class FilteringColorForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedSort: []
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value;
        const index = this.state.selectedSort.indexOf(value)
        if (index > -1) {
            this.state.selectedSort.splice(index, 1);
        } else {
            this.state.selectedSort.push(value);
        }
        this.props.sortChange(this.state.selectedSort)
    }

    render() {
        return (
            <>
                <div className="grid-container">
                    <div className="grid-item">
                        <hr />
                        <form action="/action_page.php">
                            <input className="ml-5 mr-5" type="checkbox" id="fRed" name="fRed" value="red" onChange={(e) => this.handleChange(e)} />
                            <label className="ml-5 mr-5" htmlFor="fRed">Red {'>'} 50%</label>
                            <input className="ml-5 mr-5" type="checkbox" id="fGreen" name="fGreen" value="green" onChange={(e) => this.handleChange(e)} />
                            <label className="ml-5 mr-5" htmlFor="fGreen">Green {'>'} 50%</label>
                            <input className="ml-5 mr-5" type="checkbox" id="fBlue" name="fBlue" value="blue" onChange={(e) => this.handleChange(e)} />
                            <label className="ml-5 mr-5" htmlFor="fBlue">Blue {'>'} 50%</label>
                            <input className="ml-5 mr-5" type="checkbox" id="fSaturation" name="fSaturation" value="saturation" onChange={(e) => this.handleChange(e)} />
                            <label className="ml-5 mr-5" htmlFor="fSaturation">Saturation {'>'} 50%</label>
                        </form>
                        <hr />
                    </div>
                </div>
            </>
        );
    }
}

export default FilteringColorForm;
