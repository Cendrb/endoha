module TitleHelper
  def set_title(title)
    content_for :title, title
  end

  def get_title
    if content_for? :title
      "Endoha - #{content_for :title}"
    else
      'Endoha'
    end
  end
end