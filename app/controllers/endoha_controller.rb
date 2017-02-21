class EndohaController < ApplicationController
  def index
    @categories = []
    Category.all.each do |category|
      books = []
      category.books.order(:name).each do |book|
        books << {
            id: book.id,
            name: book.name,
            author: book.author,
            isSelected: book.is_bound_to?(current_class_member),
            totalSelectedBy: book.class_members.count
        }
      end
      @categories << {
          id: category.id,
          name: category.name,
          minBooks: category.min_books,
          books: books
      }
    end
    render component: 'EndohaList', props: {data: @categories}
  end

  def update_binding
    book = Book.find(params[:id])
    if params[:isSelected] == 'true'
      book.bind_to(current_class_member)
    else
      book.unbind_from(current_class_member)
    end
  end
end
