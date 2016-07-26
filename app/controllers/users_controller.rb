class UsersController < ApplicationController
  
  before_action :authenticate_user!

  def get_token
    @user = User.find(current_user.id)
    @user.token = @user.uriToken[:access_token]
    @user.save
    respond_to do |format|
      format.html
      format.json {render json: @user}
    end
  end

  def neighbour_traffic
    @user = User.find(1)
    point_radio = params[:coordinates]
    respond = @user.radioTraffic(@user.token, point_radio)
    render json: respond
  end

  def dataPointers
    @user = User.find(current_user)
    pointers = params[:coordinates]
    respond = @user.publicRoutes(@user.token, pointers)
    if respond.kind_of?(Array)
      render json: respond
    elsif respond.kind_of?(Hash)
      if respond['error'] == "expired_token" or "invalid_token"
        render json: respond
      elsif respond['error'] == "invalid_params"
        render json: respond
      elsif respond['type'].present?
        render json: respond
      end
    end
  end

  helper_method :guest_user

  def guest_user
    u = User.create(:name => "guest", :email => "guest_#{Time.now.to_i}#{rand(100)}@example.com", :password => "guest_#{Time.now.to_i}#{rand(100)}")
    if u.save
      redirect_to {token_path}
    end
  end

  private

  def params_user
    pramas.require(:user).permit(:token)
  end


end