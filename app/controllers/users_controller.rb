class UsersController < ApplicationController

def get_token
		var the_url = "https://api.intraffic.com.ve/oauth2/token"

		$.ajax({
			type: 'POST',
			url: 'http://api.intraffic.com.ve/oauth2/token',
			headers: {
				'User-agent' : 'develop',
				'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Length' : '29',
				'Authorization' : 'Basic' + 'base64("academiahack:YWNhZGVtaWFoYWNrOjQzNTFkNDBmMzAzMGFhZDIyMDdmZTU3MTUyMjk4MTFiNzFjN2Y2ZWU=")'
				},
				form: {
					grant_type: "client_credentials"
				}
				dataType: 'json',
				contentType: 'application/json',
				async: true,
				cache: false
			}

		end


	end

end