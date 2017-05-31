require 'json'

class ChatBotController < ApplicationController
  before_action :parse

  def index
    steps = JSON.parse(@@file)
    @chat_bot_props = { steps: steps, isadmin: current_user.try(:admin?), current_user: current_user, is_Logged_in: user_signed_in? }
  end

  private
  def parse
    @@file = File.read("#{Rails.root}/public/logic.json")
  end
end
