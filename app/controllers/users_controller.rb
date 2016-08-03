class UsersController < ApplicationController
  

  before_action :authenticate_user!, except: [:guest_user]

  def get_token
    @user = User.find(current_user.id)
    @user.token = @user.inTrafficTokens("https://api.intraffic.com.ve",true)["access_token"]
    @user.tokenDNS = @user.inTrafficTokens("http://intraffic.duckdns.org:8096",false)["access_token"]
    @user.save
    respond_to do |format|
      format.html
      format.json {render json: "api: #{@user.token}, dns: #{@user.tokenDNS}"}
    end
  end

  def neighbour_traffic
    @user = User.find(current_user.id)
    point_radio = params[:coordinates]
    respond = @user.radioTraffic(@user.tokenDNS, point_radio)
    render json: respond
  end

  def dataPointers
    @user = User.find(current_user.id)
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



  def guest_user
     u = User.new(email:"guest_#{Time.now.to_i}#{rand(100)}@example.com", :password => "guest_1234")
   if u.save
     user = User.last
     sign_in(user)
    redirect_to  token_path
  else
     render json:"Error 404"
    end
  end

  private

  def params_user
    pramas.require(:user).permit(:token, :tokenDNS)
  end
end