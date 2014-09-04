class ModsController < ApplicationController
  def index
    @mods = Mod.all
  end

  def new
    @mod = Mod.new
  end

  def create
    @mod = Mod.new(mod_params)

    if @mod.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def mod_params
    params.require(:mod).permit(:name, :code, :description)
  end
end
