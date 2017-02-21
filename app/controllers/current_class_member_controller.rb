class CurrentClassMemberController < ApplicationController

  def form
  end

  def set
    if ClassMember.find_by_id(params[:class_member_id])
      session[:class_member_id] = params[:class_member_id]
      redirect_to :root
    else
      redirect_to current_class_member_path
    end
  end
end
