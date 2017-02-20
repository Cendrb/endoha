json.extract! category, :id, :name, :min_books, :created_at, :updated_at
json.url category_url(category, format: :json)