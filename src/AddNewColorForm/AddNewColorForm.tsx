import './AddNewColorForm.scss';
import React from 'react';

type Props = {
    submitData: (newValue: string) => void
}

type State = {
    value: string;
    errors: string;
}

class AddNewColorForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { value: '', errors: '' };
    }

    componentDidMount() {
        this.setState({ errors: '' });
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.handleValidation(e);
        this.setState({ value: e.target.value });
    }

    handleValidation(e: React.ChangeEvent<HTMLInputElement>): void {
        let fields = e.target.value;
        let defaultErrorMessage = "Not a valid HEX or RGB format."

        if (fields.length === 0) {
            this.setState({ errors: '' });
            return
        }

        if (fields.startsWith("#")) {
            if (fields.length > 7) {
                this.setState({ errors: defaultErrorMessage });
                return
            }

            const hexRegex: RegExp = /^#([0-9A-F]{3}){1,2}$/i;
            if (!hexRegex.test(fields)) {
                this.setState({ errors: defaultErrorMessage });
                return
            }
            this.setState({ errors: '' });
            return
        }
        this.setState({ errors: defaultErrorMessage });
        return
    }

    isButtonDisabled(): boolean {
        if (this.state.value.length === 0) return true;
        if (this.state.errors.length > 1) return true;
        return false;
    }

    submitData(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.props.submitData(this.state.value)
        this.setState({ value: '' });
    }

    render() {
        return (
            <>
                <div className="grid-container">
                    <div className="grid-item add-new-form mb-0">
                        <form onSubmit={(e) => this.submitData(e)}>
                            <label htmlFor="fHexColor">Add new color:</label>
                            <input ref="fHexColor" className="ml-10" type="text" id="fHexColor" name="fHexColor" onChange={(e) => this.handleChange(e)} value={this.state.value}
                                maxLength={7}
                            />
                            <input className="ml-10" type="submit" value="Add" disabled={this.isButtonDisabled()} />
                        </form>
                    </div>
                    <div className="grid-item add-new-form mb-0">
                        <span style={{ color: "red" }}>{this.state.errors}</span>
                    </div>
                </div>
            </>
        );
    }
}

export default AddNewColorForm;
