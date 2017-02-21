class EndohaBook extends React.Component {

    constructor(props) {
        super(props);
        this.toggleIsSelected = this.toggleIsSelected.bind(this);
        this.state = {
            isSelected: this.props.isSelected,
            totalSelectedBy: this.props.totalSelectedBy
        }
    }

    toggleIsSelected() {
        let isSelected = !this.state.isSelected;
        let totalSelectedBy = this.state.totalSelectedBy + (isSelected ? 1 : -1)
        this.setState({
            isSelected: isSelected,
            totalSelectedBy: totalSelectedBy
        });


        $.ajax({
            url: '/endoha/update_binding',
            type: 'POST',
            data: {
                id: this.props.id,
                isSelected: isSelected
            }
        });
        this.props.onSelectedChanged(totalSelectedBy, isSelected)
    }

    render() {
        let {name, author} = this.props;
        let {isSelected, totalSelectedBy} = this.state;
        return (
            <div className="endoha_book" style={{backgroundColor: (isSelected ? '#388E3C' : 'white')}}
                 onClick={this.toggleIsSelected}>
                <input className="selected" type="checkbox" checked={isSelected} onChange={this.toggleIsSelected}/>
                <div className="title">{name} od {author}</div>
                <div className="subtitle">vybralo už celkem {totalSelectedBy} lidí</div>
            </div>
        );
    }
}

EndohaBook.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    onSelectedChanged: React.PropTypes.func.isRequired,
    totalSelectedBy: React.PropTypes.number.isRequired
};
