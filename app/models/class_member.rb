class ClassMember < ApplicationRecord
  has_many :books, through: :book_class_member_bindings

  def full_name
    return first_name + ' ' + last_name
  end

  def of_name
    return last_name + ' ' + first_name
  end
end
