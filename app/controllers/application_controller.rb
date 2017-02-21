class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def require_class_member
    if !current_class_member
      redirect_to current_class_member_path
    end
  end

  def current_class_member
    begin
      if !session[:class_member_id].nil?
        return ClassMember.find(session[:class_member_id])
      end
    rescue Exception => e
      session[:class_member_id] = nil
      puts "Unable to fetch class member, session wiped! (#{e.message})"
    end
  end

  helper_method :current_class_member
end
