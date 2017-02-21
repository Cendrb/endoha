class EndohaList extends React.Component {

    constructor(props) {
        super(props);
        this.totalMinBooks = 20;
        this.handleCategoryTotalSelectedBookKindsChange = this.handleCategoryTotalSelectedBookKindsChange.bind(this);
        this.handleCategorySelectedBooksChange = this.handleCategorySelectedBooksChange.bind(this)

        this.state = {
            totalSelectedBookKinds: this.props.data.reduce(
                (acc, category) => acc + category.books.filter((book) => book.totalSelectedBy > 0).length, 0),
            selectedBooksCount: this.props.data.reduce(
                (acc, category) => acc + category.books.filter((book) => book.isSelected).length, 0)
        }
    }

    handleCategorySelectedBooksChange(previousValue, currentValue) {
        this.setState({
            selectedBooksCount: this.state.selectedBooksCount - previousValue + currentValue
        });
    }

    handleCategoryTotalSelectedBookKindsChange(previousValue, currentValue) {
        this.setState({
            totalSelectedBookKinds: this.state.totalSelectedBookKinds - previousValue + currentValue
        });
    }

    render() {
        let {totalSelectedBookKinds} = this.state;
        return <div className="endoha_list">
            {this.renderSelectedBooksRemaining()}
            <div className="total_selected_book_kinds">
                Celkem si naše třída vybrala {totalSelectedBookKinds} knih
            </div>

            {this.props.data.map((category) => (
                <EndohaCategory key={category.id}
                                onTotalSelectedBookKindsChange={this.handleCategoryTotalSelectedBookKindsChange}
                                onSelectedBooksChange={this.handleCategorySelectedBooksChange}
                                {...category} />
            )
        )}
        </div>;
    }

    renderSelectedBooksRemaining() {
        let {selectedBooksCount} = this.state;
        let {totalMinBooks} = this;
        if (selectedBooksCount < totalMinBooks) {
            return (
                <div className="your_selected_books_count not_enough">
                    Máte vybráno {selectedBooksCount} z {totalMinBooks} knih.
                </div>
            )
        }
        else if(selectedBooksCount > totalMinBooks) {
            return (
                <div className="your_selected_books_count not_enough">
                    Máte vybráno o {selectedBooksCount - totalMinBooks} knih více. (požadováno je {totalMinBooks}, vy máte {selectedBooksCount})
                </div>
            )
        }
        else {
            return (
                <div className="your_selected_books_count enough">
                    Máte vybráno všech {totalMinBooks} knih.
                </div>
            )
        }
    }
}

EndohaList.propTypes = {
    data: React.PropTypes.array
};
