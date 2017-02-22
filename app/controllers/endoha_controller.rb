class EndohaController < ApplicationController

  before_action :require_class_member

  def index
    categories = []
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
      categories << {
          id: category.id,
          name: category.name,
          minBooks: category.min_books,
          books: books
      }
    end
    peopleFullySelected = []
    ClassMember.select(['class_members.*', 'count(book_class_member_bindings.id) as bindings_count']).
        joins('LEFT OUTER JOIN book_class_member_bindings ON class_members.id = book_class_member_bindings.class_member_id').
        group('class_members.id').each do |class_member|
      if class_member.books.count == Book.books_required
        peopleFullySelected << class_member.full_name
      end
    end
    puts current_class_member.books.count
    render component: 'EndohaList', props: {
        categories: categories,
        peopleFullySelectedCount: peopleFullySelected.count,
        totalRequiredBooks: Book.books_required}
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
