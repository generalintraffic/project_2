class UsersController < ApplicationController
  
  before_action :authenticate_user!

  def get_token
    @user = User.find(current_user)
    @user.token = @user.uriToken[:access_token]
    @user.save
  end

  def neighbour_traffic
    @user = User.find(current_user)
    respond = @user.publicRoutes(@user.token)
    if respond.kind_of?(Array)
      render json: respond[0]['id']
    elsif respond.kind_of?(Hash)
      render json: respond['error']
    end
  end

  private

  def params_user
    pramas.require(:user).permit(:token)
  end

end