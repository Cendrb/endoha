json.book do
  json.id book.id
  json.name book.name
  json.author book.author
  json.category_name book.category.name
end
json.url book_url(book, format: :json)