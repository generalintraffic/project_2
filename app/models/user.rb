class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def inTrafficTokens(url,ssl)
    url = URI("#{url}/oauth2/token")
    https = Net::HTTP.new(url.host,url.port)
    https.use_ssl = ssl
    https.verify_mode = OpenSSL::SSL::VERIFY_NONE
    client_secret = 'YWNhZGVtaWFoYWNrOjQzNTFkNDBmMzAzMGFhZDIyMDdmZTU3MTUyMjk4MTFiNzFjN2Y2ZWU='

    data =  {
              "grant_type" => "client_credentials",
              "dataType" => "json",
              "contentType" => "application/json"
            }

    req = https.post(url.path, data.to_json, {
      'User-Agent' => 'develop',
      'Content-Type' => 'application/json',
      'Content-Length' => '29',
      'Authorization' => "Basic " + client_secret
      })
    response = JSON.parse(req.read_body)
    return response
  end

  def publicRoutes(token, points)
    url = 'https://api.intraffic.com.ve/routing.geojson'
    params = CGI.unescape({'points' => [points[:points][0], points[:points][1]]}.to_query)
    uri = URI([url, params].join("?"))
    
    https = Net::HTTP.new(uri.host,uri.port)
    https.use_ssl = true
    https.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
    req = https.get(uri, {
      "user-agent" => "develop",
      "authorization" => "Bearer " + token,
      "cache-control" => "no-cache"
    })

    routesPublic = req.read_body
    
    return JSON.parse(routesPublic)
  end

  def radioTraffic(token, pointRadio)
    url = 'https://intraffic.duckdns.org:8096/links/in_circle.geojson'
    params = CGI.unescape({'point' => pointRadio[:pointRadio][0], 'radio' => pointRadio[:pointRadio][1]}.to_query)
    uri = URI([url, params].join("?"))
    
    https = Net::HTTP.new(uri.host,uri.port)
    https.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
    req = https.get(uri, {
      "user-agent" => "develop",
      "authorization" => "Bearer " + token,
      "cache-control" => "no-cache"
    })

    radioTraffic = req.read_body[/{.+./]

    return JSON.parse(radioTraffic)
  end

end