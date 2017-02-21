class EndohaCategory extends React.Component {

    constructor(props) {
        super(props);
        this.handleBookSelectedChange = this.handleBookSelectedChange.bind(this);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            selectedBooksCount: this.props.books.filter((book) => book.isSelected).length,
            totalSelectedBookKinds: this.props.books.filter((book) => book.totalSelectedBy > 0).length,
            showList: false
        }
    }

    handleBookSelectedChange(totalSelectedBy, isSelected) {
        let totalSelectedBookKindsDiff;
        if (isSelected && totalSelectedBy == 1) {
            totalSelectedBookKindsDiff = 1;
        }
        else if (isSelected && totalSelectedBy > 1) {
            totalSelectedBookKindsDiff = 0;
        }
        else {
            totalSelectedBookKindsDiff = -1;
        }
        let totalSelectedBookKinds = this.state.totalSelectedBookKinds + (totalSelectedBookKindsDiff);
        if (this.props.onTotalSelectedBookKindsChange) {
            this.props.onTotalSelectedBookKindsChange(this.state.totalSelectedBookKinds, totalSelectedBookKinds);
        }
        let selectedBooksCount = this.state.selectedBooksCount + (isSelected ? 1 : -1);
        if (this.props.onSelectedBooksChange) {
            this.props.onSelectedBooksChange(this.state.selectedBooksCount, selectedBooksCount);
        }
        this.setState({
            selectedBooksCount: selectedBooksCount,
            totalSelectedBookKinds: totalSelectedBookKinds
        });
    }

    handleHeaderClick() {
        this.setState({
            showList: !this.state.showList
        })
    }

    render() {
        let {name, books} = this.props;
        let {showList} = this.state;
        return (
            <div className="endoha_category">
                <div className="header" onClick={this.handleHeaderClick}>
                    {this.renderSelectedBooksStatus()}
                    <div className="title">{name}</div>
                </div>
                <div className="book_list" style={{display: (showList ? 'block' : 'none')}}>
                    {books.map((book) => (
                        <EndohaBook
                            key={book.id}
                            onSelectedChanged={this.handleBookSelectedChange}
                            {...book} />))}
                    <div className="total_selected_book_kinds">z této kategorie máme
                        vybráno celkem {this.state.totalSelectedBookKinds} druhů knih
                    </div>
                </div>
            </div>
        );
    }

    renderSelectedBooksStatus() {
        let {minBooks} = this.props;
        let {selectedBooksCount} = this.state;
        if (selectedBooksCount < minBooks) {
            return (<div className="selected_books_status not_enough">Pro splnění požadavků vyberte
                ještě {minBooks - selectedBooksCount} knih</div>);
        }
        else {
            return (<div className="selected_books_status enough">Požadavek pro minimální počet knih v této kategorii
                splňujete</div>);
        }
    }
}

EndohaCategory.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    minBooks: React.PropTypes.number.isRequired,
    books: React.PropTypes.array.isRequired,
    onTotalSelectedBookKindsChange: React.PropTypes.func,
    onSelectedBooksChange: React.PropTypes.func
};
