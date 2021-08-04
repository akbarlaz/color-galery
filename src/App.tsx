import './App.scss';
import React from 'react';
import CardList from './CardList/CardList';
import { ColorObject } from './custom-type';
import AddNewColorForm from './AddNewColorForm/AddNewColorForm';
import FilteringColorForm from './FilteringColorForm/FilteringColorForm';
import { hexToRgb, rgbToHsl } from './utils';

const DUMMY: ColorObject[] = [
  { value: "#1ABC9C", canRemove: false }, { value: "#2ECC71", canRemove: false },
  { value: "#3498DB", canRemove: false }, { value: "#9B59B6", canRemove: false },
  { value: "#34495E", canRemove: false }, { value: "#16A085", canRemove: false },
  { value: "#27AE60", canRemove: false }, { value: "#2980B9", canRemove: false },
  { value: "#8E44AD", canRemove: false }, { value: "#2C3E50", canRemove: false },
  { value: "#F1C40F", canRemove: false }, { value: "#E67E22", canRemove: false },
  { value: "#E74C3C", canRemove: false }, { value: "#ECF0F1", canRemove: false },
  { value: "#95A5A6", canRemove: false }, { value: "#F39C12", canRemove: false },
  { value: "#D35400", canRemove: false }, { value: "#C0392B", canRemove: false },
  { value: "#BDC3C7", canRemove: false }, { value: "#7F8C8D", canRemove: false }
]

type Props = {
}

type State = {
  selectedSort: string[];
  listOfColor: ColorObject[];
  listOfColorFiltered: ColorObject[];
  isLoading: boolean;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    if (localStorage.getItem("listOfColor") !== null) {
      const listOfColor = JSON.parse(localStorage.getItem("listOfColor")!) as ColorObject[];
      if (listOfColor.length > 0)
        this.state = {
          listOfColor: listOfColor,
          isLoading: false,
          listOfColorFiltered: listOfColor,
          selectedSort: []
        }
    } else {
      this.state = {
        listOfColor: DUMMY,
        isLoading: false,
        listOfColorFiltered: DUMMY,
        selectedSort: []
      };
      localStorage.setItem("listOfColor", JSON.stringify(this.state.listOfColor))
    }
    this.filterColor()
  }

  toggleIsLoading(): void {
    this.setState({ isLoading: !this.state.isLoading })
  }

  filterColor(): void {
    this.setState({ isLoading: true })
    if (this.state.selectedSort.length > 0) {
      const isRed = this.state.selectedSort.indexOf("red") > -1;
      const isGreen = this.state.selectedSort.indexOf("green") > -1;
      const isBlue = this.state.selectedSort.indexOf("blue") > -1;
      const isSaturation = this.state.selectedSort.indexOf("saturation") > -1;
      this.setState({
        listOfColorFiltered: this.state.listOfColor.filter((el) => {
          const rgbObject = hexToRgb(el.value);
          const hslObject = rgbToHsl(rgbObject!.r, rgbObject!.g, rgbObject!.b)
          if (isRed && isGreen && isBlue && isSaturation) {
            if (rgbObject!.r > 127 && rgbObject!.g > 127 && rgbObject!.b > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isRed && isGreen && isBlue) {
            if (rgbObject!.r > 127 && rgbObject!.g > 127 && rgbObject!.b > 127) {
              return el;
            }
          } else if (isRed && isGreen && isSaturation) {
            if (rgbObject!.r > 127 && rgbObject!.g > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isRed && isBlue && isSaturation) {
            if (rgbObject!.r > 127 && rgbObject!.b > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isGreen && isBlue && isSaturation) {
            if (rgbObject!.g > 127 && rgbObject!.b > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isRed && isGreen) {
            if (rgbObject!.r > 127 && rgbObject!.g > 127) {
              return el;
            }
          } else if (isRed && isBlue) {
            if (rgbObject!.r > 127 && rgbObject!.b > 127) {
              return el;
            }
          } else if (isRed && isSaturation) {
            if (rgbObject!.r > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isGreen && isBlue) {
            if (rgbObject!.g > 127 && rgbObject!.b > 127) {
              return el;
            }
          } else if (isGreen && isSaturation) {
            if (rgbObject!.g > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isBlue && isSaturation) {
            if (rgbObject!.b > 127
              && hslObject.s > 50
            ) {
              return el;
            }
          } else if (isRed) {
            if (rgbObject!.r > 127) {
              return el;
            }
          } else if (isGreen) {
            if (rgbObject!.g > 127) {
              return el;
            }
          } else if (isBlue) {
            if (rgbObject!.b > 127) {
              return el;
            }
          } else {
            if (hslObject.s > 50) {
              return el;
            }
          }
        }).sort(this.colorSorting)
      });
    } else {
      this.setState({ listOfColorFiltered: this.state.listOfColor.sort(this.colorSorting) })
    }
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 100)
  }

  colorSorting(a: ColorObject, b: ColorObject): number {
    const rgbObjectA = hexToRgb(a.value)!;
    const rgbObjectB = hexToRgb(b.value)!;
    if (rgbObjectA.r !== rgbObjectB.r) {
      if (rgbObjectA.r > rgbObjectB.r) {
        return -1;
      }
      if (rgbObjectA.r < rgbObjectB.r) {
        return 1;
      }
    }
    if (rgbObjectA.g !== rgbObjectB.g) {
      if (rgbObjectA.g > rgbObjectB.g) {
        return -1;
      }
      if (rgbObjectA.g < rgbObjectB.g) {
        return 1;
      }
    }
    if (rgbObjectA.b !== rgbObjectB.b) {
      if (rgbObjectA.b > rgbObjectB.b) {
        return -1;
      }
      if (rgbObjectA.b < rgbObjectB.b) {
        return 1;
      }
    }
    return 0;
  }




  render() {
    return (
      <div className="App" >

        <AddNewColorForm submitData={(newValue: string) => {
          this.state.listOfColor.push({ value: newValue.toUpperCase(), canRemove: true })
          localStorage.setItem("listOfColor", JSON.stringify(this.state.listOfColor))
          this.filterColor()
        }} />

        <FilteringColorForm sortChange={(selectedSort: string[]) => {
          this.setState({ selectedSort: selectedSort })
          this.filterColor()
        }} />

        {
          !this.state.isLoading ?
            <CardList listOfColor={this.state.listOfColorFiltered} removeColor={(index: number) => {
              this.state.listOfColor.splice(index, 1)
              localStorage.setItem("listOfColor", JSON.stringify(this.state.listOfColor))
              this.filterColor()
            }} /> : <div></div>
        }

      </div >
    );
  }
}

export default App;
