class Book < ApplicationRecord
  has_many :book_class_member_bindings
  has_many :class_members, through: :book_class_member_bindings
  belongs_to :category

  def is_bound_to?(class_member)
    return BookClassMemberBinding.exists?(class_member: class_member, book: self)
  end

  def bind_to(class_member)
    if !is_bound_to?(class_member)
      return BookClassMemberBinding.create(class_member: class_member, book: self)
    end
  end

  def unbind_from(class_member)
    return BookClassMemberBinding.where(class_member: class_member, book: self).destroy_all
  end
end
