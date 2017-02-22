class EndohaList extends React.Component {

    constructor(props) {
        super(props);
        this.handleCategoryTotalSelectedBookKindsChange = this.handleCategoryTotalSelectedBookKindsChange.bind(this);
        this.handleCategorySelectedBooksChange = this.handleCategorySelectedBooksChange.bind(this)

        this.state = {
            totalSelectedBookKinds: this.props.categories.reduce(
                (acc, category) => acc + category.books.filter((book) => book.totalSelectedBy > 0).length, 0),
            selectedBooksCount: this.props.categories.reduce(
                (acc, category) => acc + category.books.filter((book) => book.isSelected).length, 0),
            peopleFullySelectedCount: this.props.peopleFullySelectedCount
        }
    }

    handleCategorySelectedBooksChange(previousValue, currentValue) {
        let {totalRequiredBooks} = this.props;
        let selectedBooksCount = this.state.selectedBooksCount - previousValue + currentValue;
        let peopleFullySelected = this.state.peopleFullySelectedCount;
        if (selectedBooksCount !== this.state.selectedBooksCount) {
            if (selectedBooksCount == totalRequiredBooks) {
                peopleFullySelected += 1;
            }
            if (this.state.selectedBooksCount == totalRequiredBooks) {
                peopleFullySelected -= 1;
            }
        }

        this.setState({
            selectedBooksCount: selectedBooksCount,
            peopleFullySelectedCount: peopleFullySelected
        });
    }

    handleCategoryTotalSelectedBookKindsChange(previousValue, currentValue) {
        this.setState({
            totalSelectedBookKinds: this.state.totalSelectedBookKinds - previousValue + currentValue
        });
    }

    render() {
        let {categories} = this.props;
        let {totalSelectedBookKinds, peopleFullySelectedCount} = this.state;
        return <div className="endoha_list">
            <h2>Maturitní seznam četby</h2>

            <h3>Stav třídy</h3>
            <div className="people_fully_selected">{peopleFullySelectedCount} lidí už má vybráno všech 20 knih!</div>
            <div className="total_selected_book_kinds">
                Celkem si naše třída vybrala {totalSelectedBookKinds} knih
            </div>

            {this.renderSelectedBooksRemaining()}
            <h3>Váš stav</h3>

            {categories.map((category) => (
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
        let {totalRequiredBooks} = this.props;
        if (selectedBooksCount < totalRequiredBooks) {
            return (
                <div className="your_selected_books_count not_enough">
                    Máte vybráno {selectedBooksCount} z {totalRequiredBooks} knih.
                </div>
            )
        }
        else if (selectedBooksCount > totalRequiredBooks) {
            return (
                <div className="your_selected_books_count not_enough">
                    Máte vybráno o {selectedBooksCount - totalRequiredBooks} knih více. (požadováno
                    je {totalRequiredBooks}, vy máte {selectedBooksCount})
                </div>
            )
        }
        else {
            return (
                <div className="your_selected_books_count enough">
                    Máte vybráno všech {totalRequiredBooks} knih.
                </div>
            )
        }
    }
}

EndohaList.propTypes = {
    categories: React.PropTypes.array.isRequired,
    peopleFullySelectedCount: React.PropTypes.number.isRequired,
    totalRequiredBooks: React.PropTypes.number.isRequired
};
