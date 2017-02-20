json.extract! class_member, :id, :first_name, :last_name, :created_at, :updated_at
json.url class_member_url(class_member, format: :json)