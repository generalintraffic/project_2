class AddTokenDnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tokenDNS, :string
  end
end
