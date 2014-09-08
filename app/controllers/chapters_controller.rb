class ChaptersController < ApplicationController
  def new
    @mod = Mod.find_by_slug(params[:mod_id])
    @chapter = Chapter.new
  end

  def create
    @chapter = Chapter.new(chapter_params)
    @mod = Mod.find_by_slug(params[:mod_id])
    @chapter.mod = @mod

    if @chapter.save
      redirect_to mod_path(@mod)
    else
      render :new
    end
  end

  private

  def chapter_params
    params.require(:chapter).permit(:name, :mod_id, :chapter_number)
  end
end
