class EndohaList extends React.Component {

    constructor(props) {
        super(props);
        this.handleCategoryTotalSelectedBookKindsChange = this.handleCategoryTotalSelectedBookKindsChange.bind(this)
        let totalSelectedBookKinds = this.props.data.reduce(
            (acc, category) => acc + category.books.filter((book) => book.totalSelectedBy > 0).length, 0);

        this.state = {
            totalSelectedBookKinds: totalSelectedBookKinds
        }
    }

    handleCategoryTotalSelectedBookKindsChange(previousValue, currentValue) {
        this.setState({
            totalSelectedBookKinds: this.state.totalSelectedBookKinds - previousValue + currentValue
        });
    }

    render() {
        let {totalSelectedBookKinds} = this.state;
        return <div className="endoha_list">{this.props.data.map((category) => (
            <EndohaCategory key={category.id}
                            onTotalSelectedBookKindsChange={this.handleCategoryTotalSelectedBookKindsChange}
                            {...category} />
        )
        )}
        <div className="total_selected_book_kinds">Celkem si naše třída vybrala {totalSelectedBookKinds} knih</div>
        </div>;
    }
}

EndohaList.propTypes = {
    data: React.PropTypes.array
};
