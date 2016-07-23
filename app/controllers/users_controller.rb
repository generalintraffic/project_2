class UsersController < ApplicationController
  
  # before_action :authenticate_user!

  def get_token
    @user = User.find(1)
    @user.token = @user.uriToken[:access_token]
    @user.save
    render json: @user
  end

  def dataPointers
    @user = User.find(1)
    pointers = params[:coordinates]
    respond = @user.publicRoutes(@user.token, pointers)
    if respond['type'].present?
      render json: respond
    elsif respond['error'].present?
      render json: respond['error']
    end
  end

  def neighbour_traffic
    any = params[:range]
    render json: any
  end

  private

  def params_user
    pramas.require(:user).permit(:token)
  end

end