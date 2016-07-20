class UsersController < ApplicationController

  def get_token
    @user = User.new
    render :json => @user.uriToken
  end

end